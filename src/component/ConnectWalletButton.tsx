import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { injected } from "./connectors";


const ConnectWalletButton = () => {
  const { active, account, activate, deactivate } = useWeb3React()

  const connect = async () => {
    console.log('Connecting to MetaMask Wallet')
    try {
      await activate(injected)
    } catch (error) {
      console.log('Error on connecting: ', error)
    }
  }

  const disconnect = async () => {
    console.log('Deactivating...')
    try {
      await deactivate()
    } catch (error) {
      console.log('Error on disconnecting: ', error)
    }
  }

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}

export default ConnectWalletButton
