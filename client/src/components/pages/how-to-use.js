import React, { Component } from "react";
import "../../App.css";
class HowToUse extends Component {
  render() {
    return (
      <>
        <div class="howTo">
          <div class="spaceTop"></div>
          <h1>How To Use ?</h1>
          <hr />
          <div class="spaceImg"></div>
          <h2>About</h2>
          This dApp allows you to create wallets with contract accounts. You can
          receive and send your money and also you can check your wallet
          balance.
          <li>
            The owner of the wallet can only see the balance and send money from
            account.
          </li>
          <li>Every EOA can have only one contract wallet. </li>
          <li>
            You can't make a money transfer from one contract wallet to another
            contract wallet
          </li>
          <div class="spaceImg"></div>
          <h2>Send/Add Money</h2>
          On the Send Add Money page you can simply add money with add money
          section like shown in the down :
          <div>
          <div class="spaceImg"></div>
          <img src={require("../images/Add-Money.gif")} width="400" />
          </div>
          And you can send some money from your account like shown in the down :
          <div>
          <div class="spaceImg"></div>
          <img src={require("../images/Send-Money.gif")} width="400" />
          </div>
          <div class="spaceDown"></div>
        </div>
      </>
    );
  }
}

export default HowToUse;
