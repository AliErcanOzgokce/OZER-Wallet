import React, { Component } from "react";
import Wallet from "../../contracts/Wallet.json";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "react-awesome-button/dist/styles.css";
import getWeb3 from "../../getWeb3";

import "../../App.css";

class Home extends Component {
  state = {
    addAmount: 0,
    sendAmount: 0,
    walletBalance: 0,
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

    const _walletAddress = await contract.methods
      .walletAddr()
      .call({ from: accounts[0] });

    const _walletOwner = await contract.methods
      .owner()
      .call({ from: accounts[0] });

    const _walletBalance = await contract.methods
      .checkBalance()
      .call({ from: accounts[0] });

    this.setState({
      walletBalance: _walletBalance,
      walletOwner: _walletOwner,
      walletAddress: _walletAddress,
    });
  };
  render() {
    if (!this.state.web3) {
        if(window.location.hash !== "#2") {
        window.location.href += "#2";
        window.location.reload(false);
        }
      return (<div>Loading Web3, accounts, and contract...</div>);
    }
    return (
      <>
        <center>
          <div>
            <div class="spaceTop"></div>
            <div style={{ color: "#fcfcfc" }}>
              <FontAwesomeIcon icon={faEthereum} size="6x" />
              <div>&nbsp;</div>
              <h1>{this.state.walletBalance / 1000000000000000000} ETH</h1>
            </div>
            <div class="space"></div>
            <p>
              <div style={{ color: "#6d6d6d" }}>Owner</div>{" "}
              {this.state.walletOwner}
            </p>
            <div class="space"></div>
            <p>
              <div style={{ color: "#6d6d6d" }}>Wallet Address</div>
              {this.state.walletAddress}
            </p>
          </div>
          <div class="space"></div>
          <div>
            <Link to="/send-add-money">
              <AwesomeButton type="primary">Add Money</AwesomeButton>
            </Link>
            <div class="space"></div>
            <Link to="/send-add-money">
              <AwesomeButton type="secondary">Send Money</AwesomeButton>
            </Link>
          </div>
        </center>
        <div class="spaceDown"></div>
      </>
    );
  }
}

export default Home;
