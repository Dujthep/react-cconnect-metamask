import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import './App.css';
import ConnectWalletButton from './component/ConnectWalletButton';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <h1>Connect with MetaMask Demo</h1>
        <ConnectWalletButton />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
