import React from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import abi from './abi.json'
function App() {
  React.useEffect(() =>{
    loadBlockchainData();
  },[])
  const [account, setAccount] = React.useState("");
  const [candidates, setCandidate] = React.useState([]);
  const [contract, setContract] = React.useState(null);
  const loadBlockchainData = async() => {
    

    var web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then((account) => {
          // User has allowed account access to DApp...
          // console.log(account[])
          setAccount(account[0]);
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
      return;
    }
    window.ethereum.enable();
    if (typeof web3 != "undefined") {
     
      window.ethereum.enable();
    } else {
      new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
  
      window.ethereum.enable();
    }



    // const network = await web3.eth.net.getNetworkType();
    // const accounts = await web3.eth.getAccounts();
  
    web3.eth.getCoinbase((error,account) => {
        if(!error){
          setAccount(account)
        }
        
    })
    const election = new web3.eth.Contract(abi,"0xBB564903Eb409eFd40B7725c0d9106ea777e437E");
    setContract(election);
    const cadidateCount = await election.methods.candidatesCount().call();
    console.log(cadidateCount)
    let _candidates = [];
    for(let i = 1; i <= cadidateCount; i++){
        let data = await election.methods.candidates(i).call();
        _candidates.push(data)
    }
    setCandidate(_candidates);
  }
  // const pingCandidates = () => {
  //   console.log(candidates)
  //   candidates.map((value,index) => {
  //     console.log(value.name);
  //   })
  // }
  const vote = async (id) => {
    console.log(id);
    const flag = await contract.methods.vote(parseInt(id)).send({
      from: account
    })
    // console.log(flag);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>Your Account: {account}</p>
          {/* <button onClick={pingCandidates}>candidates</button> */}
          {candidates.length !== 0 && 
            candidates.map((value,index) => {
              return(
                <div key={value.id} style={{display:"inline-flex"}}>
                  <p >{value.name}: {value.voteCount}</p>
                  <button onClick={() => vote(value.id)}>Vote</button>
                </div>
                
              )
            })
          }
      </header>
     
    </div>
  );
}

export default App;
