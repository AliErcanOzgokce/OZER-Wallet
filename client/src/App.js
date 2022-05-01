import React, { Component } from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-awesome-button/dist/styles.css";
import Footer from "./components/Footer";
import SendAddMoney from "./components/pages/send-add-money";
import Home from "./components/pages/home";
import HowToUse from "./components/pages/how-to-use";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Router forceRefresh={true}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send-add-money" element={<SendAddMoney />} />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
