import React, { Component } from "react";
import Wallet from "../../contracts/Wallet.json";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-awesome-button/dist/styles.css";
import getWeb3 from "../..//getWeb3";

import "./send-add-money.css";

class SendAddMoney extends Component {
  render() {
    return (
      <>
          <Navbar />
          <Footer />
      </>
    );
  }
}

export default SendAddMoney;
