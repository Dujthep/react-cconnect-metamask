import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "./connectors";

const getGitHubUserWithFetch = async () => {
  const response = await fetch('https://chainid.network/chains.json');
  const jsonData = await response.json();
  console.log(jsonData);
};

const ConnectWalletButton = () => {
  const { active, account, chainId, activate, deactivate } = useWeb3React()
  const { ethereum }: any = window;

  const connect = async () => {
    console.log('Connecting to MetaMask Wallet')
    try {
      await activate(injected)
      if(chainId !== 1) {
        try {
          ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
          });
        } catch (err: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (err.code === 4902) {
            ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Polygon Mainnet',
                  chainId: '0x89',
                  nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                  rpcUrls: ['https://polygon-rpc.com/'],
                },
              ],
            });
          }
        }
      }
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
