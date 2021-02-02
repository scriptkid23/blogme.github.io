import logo from './logo.svg';
import './App.css';
import React from 'react'
import Axios from 'axios'
function App() {

  const [data,setData] = React.useState({});
  const getTime = async() => {
   
    while (true) {
 
      let {data} = await Axios({
        baseURL:"http://localhost:8000",
        method:"GET",
        url:"/api/users/tracking"
      })
      console.log(data);
      setData(data)
    }
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {data.prevStationBusStop && (data.prevStationBusStop[0]['BienKiemSoat'])}
        </p>
        <p>
          {data.prevStationBusStop && (data.prevStationBusStop[0]['TimeRemained'])}
        </p>
        <p>
        {data.prevStationBusStop && (data.currentStationBusStop[0]['BienKiemSoat'])}
        </p>
        <p>
          {data.prevStationBusStop && (data.currentStationBusStop[0]['TimeRemained'])}
        </p>
        <button onClick={() => getTime()}>Start</button>
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
