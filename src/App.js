import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import {  Route,Routes } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
//web3.0
import React, { useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

export default function App() {
  const classes = useStyles();

  /** 
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓web 3.0 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      fetchGreetings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    let contractAddress = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      provider
    );

    const greeting = await contract.greet();
    console.log(greeting);
  };

  useEffect(() => {
    connectWallet();
  }, []);
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑web 3.0 code ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
*/
  return (
    <div className={classes.App}>
    <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/coins/:id' element={<CoinPage/>} />
      </Routes>
  </div>
    

  )
}
