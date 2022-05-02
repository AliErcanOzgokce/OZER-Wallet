import React, { Component } from "react";
import Wallet from "../../contracts/Wallet.json";
import { AwesomeButtonProgress } from "react-awesome-button";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-awesome-button/dist/styles.css";
import getWeb3 from "../../getWeb3";
import SplitPane from "react-split-pane";
import { Input } from "semantic-ui-react";

import "../../App.css";
import "./send-add-money.css";

class SendAddMoney extends Component {
  state = {
    loading: false,
    errorMessage: "",
    addAmount: "",
    sendAmount: "",
    receiverAdrr: "",
    walletBalance: "",
    walletOwner: "",
    walletAddress: "",
    web3: null,
    accounts: null,
    contract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Wallet.networks[networkId];
      const instance = new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.walletInfo);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  walletInfo = async () => {
    const { accounts, contract } = this.state;

    // Getting Wallet Address
    const _walletAddress = await contract.methods
      .walletAddr()
      .call({ from: accounts[0] });
    // Getting Wallet Owner Address
    const _walletOwner = await contract.methods
      .owner()
      .call({ from: accounts[0] });
    // Getting Wallet Balance
    const _walletBalance = await contract.methods
      .checkBalance()
      .call({ from: accounts[0] });

    this.setState({
      walletBalance: _walletBalance,
      walletOwner: _walletOwner,
      walletAddress: _walletAddress,
    });
  };

  onSubmitSend = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const { accounts, contract, sendAmount, receiverAdrr, web3 } = this.state;
      // Send Money From Account
      await contract.methods
        .sendMoney(receiverAdrr, web3.utils.toWei(sendAmount, "ether"))
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, sendAmount: "", receiverAdrr: "" });
  };

  onSubmitAdd = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const { accounts, contract, addAmount, web3 } = this.state;
      // Add Money to the Account
      await contract.methods.addMoney().send({
        from: accounts[0],
        value: web3.utils.toWei(addAmount, "ether"),
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, addAmount: "" });
  };

  render() {
    if (!this.state.web3) {
      if (window.location.hash !== "#2") {
        window.location.href += "#2";
        window.location.reload(false);
      }
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <>
        <div class="SA">
          <SplitPane split="vertical" defaultSize="50%">
            <div style={{ color: "#fcfcfc" }}>
              <center>
                <div class="spaceTops"></div>
                <FontAwesomeIcon icon={faEthereum} size="6x" />
                <div>&nbsp;</div>
                <h1>{this.state.walletBalance / 1000000000000000000} ETH</h1>
                <div class="space"></div>
                <p>
                  <div style={{ color: "#6d6d6d", marginBottom: "10px" }}>
                    Owner
                  </div>{" "}
                  {this.state.walletOwner}
                </p>
                <div class="space"></div>
                <p>
                  <div style={{ color: "#6d6d6d", marginBottom: "10px" }}>
                    Wallet Address
                  </div>
                  {this.state.walletAddress}
                </p>
              </center>
            </div>
            <div>
              <center>
                <form onSubmit={this.onSubmitAdd}>
                  <div class="spaceTop"></div>
                  <div>
                    <input
                      placeholder="Value of ETH"
                      type="number"
                      id="id1"
                      value={this.state.addAmount}
                      onChange={(event) =>
                        this.setState({ addAmount: event.target.value })
                      }
                      style={{
                        backgroundColor: "#6d6d6d",
                        color: "#fcfcfc",
                        borderRadius: "100px",
                        height: "60px",
                        width: "300px",
                        paddingLeft: "2em",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <AwesomeButtonProgress
                    action={(element, next) => {
                      console.log("clicked");
                      setTimeout(() => {
                        next();
                      }, 15000);
                    }}
                    type="primary"
                  >
                    Add Money
                  </AwesomeButtonProgress>
                </form>
              </center>
              <center>
                <form onSubmit={this.onSubmitSend}>
                  <div class="spaceTop"></div>
                  <Input
                    placeholder="Reciever Address"
                    value={this.state.receiverAdrr}
                    onChange={(event) =>
                      this.setState({ receiverAdrr: event.target.value })
                    }
                  >
                    <input
                      type="text"
                      id="id1"
                      inputmode="numeric"
                      style={{
                        backgroundColor: "#6d6d6d",
                        color: "#fcfcfc",
                        borderRadius: "100px",
                        height: "60px",
                        width: "300px",
                        paddingLeft: "2em",
                        paddingRight: "2em",
                        marginBottom: "10px",
                      }}
                    />
                  </Input>
                  <Input
                    placeholder="Value of ETH"
                    value={this.state.sendAmount}
                    onChange={(event) =>
                      this.setState({ sendAmount: event.target.value })
                    }
                  >
                    <input
                      type="number"
                      id="id1"
                      inputmode="numeric"
                      style={{
                        backgroundColor: "#6d6d6d",
                        color: "#fcfcfc",
                        borderRadius: "100px",
                        height: "60px",
                        width: "300px",
                        paddingLeft: "2em",
                        marginBottom: "10px",
                      }}
                    />
                  </Input>
                  <AwesomeButtonProgress
                    action={(element, next) => {
                      console.log("clicked");
                      setTimeout(() => {
                        next();
                      }, 15000);
                    }}
                    type="secondary"
                  >
                    Send Money
                  </AwesomeButtonProgress>
                </form>
              </center>
            </div>
          </SplitPane>
        </div>
      </>
    );
  }
}

export default SendAddMoney;
