import React from 'react';
import './App.css';
import Snowfall from './Snowfall';
import ChristmasCard from './ChristmasCard';

function App() {
  return (
    <div className="App">
      <Snowfall />
      <div className="content">
        <ChristmasCard />
      </div>
    </div>
  );
}

export default App;
