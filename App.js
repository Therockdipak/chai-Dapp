import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contract/chai.json";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
      // The `useEffect` hook is used to connect to the blockchain network and initialize the contract.
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        // The ABI (Application Binary Interface) of the smart contract is stored in a constant variable `contractAbi`.
      const contractAbi = abi.abi;

      try {
        // The `ethereum` object is accessed from the window object.
        const { ethereum } = window;

        // If the `ethereum` object exists, an account is requested from the user.(metamask opening)

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setState({ provider, contract, signer });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  return (
    <div className="App">
      <Buy state={state}></Buy>
    </div>
  );
}

export default App;
