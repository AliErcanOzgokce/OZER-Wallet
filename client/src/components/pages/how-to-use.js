import React, { Component } from "react";
import "../../App.css";
class HowToUse extends Component {
  render() {
    return (
      <>
        <div>
          <div class="spaceTop"></div>
          <h1>How To Use ?</h1>
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
        </div>
      </>
    );
  }
}

export default HowToUse;
