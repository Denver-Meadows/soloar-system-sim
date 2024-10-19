import React from "react";
import "./App.css";
import SolarSystem from "./SolarSystem";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Solar System Simulator</h1>
      <SolarSystem />
    </div>
  );
};

export default App;
