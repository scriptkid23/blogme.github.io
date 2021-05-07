import React from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
function App() {
  React.useEffect(() =>{
    loadBlockchainData();
  })
  const loadBlockchainData = async() => {
    

    const web3 = new Web3("http://127.0.0.1:7545")
  
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    console.log(network);
    console.log(accounts);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
