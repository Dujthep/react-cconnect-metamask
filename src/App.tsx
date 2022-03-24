import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import ConnectWalletButton from './component/ConnectWalletButton';
import { ChainList } from './models/ChainList';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  const [chain, setChain] = useState<ChainList[]>([]);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch('https://chainid.network/chains.json');
    const jsonData: ChainList[] = await response.json();
    setChain(jsonData);
  };

  useEffect(() => {
    getGitHubUserWithFetch()
  }, [])

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
