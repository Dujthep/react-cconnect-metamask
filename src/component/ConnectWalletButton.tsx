import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import { injected } from "./connectors";

const ConnectWalletButton = () => {
  const { activate, active } = useWeb3React()
  const [isActive, setIsActive] = useState(false)

  const handleIsActive = useCallback(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    handleIsActive()
  }, [handleIsActive])

  const connect = async () => {
    console.log('Connecting to MetaMask Wallet')
    try {
      await activate(injected)
    } catch (error) {
      console.log('Error on connecting: ', error)
    }
  }

  return (
    <div>
      <label>{isActive}</label>
      <button onClick={connect}>Connect Wallet</button>
    </div>
  );
}

export default ConnectWalletButton
