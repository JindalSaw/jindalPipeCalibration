import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductionTable from "./Components/productionTable";
import { BrowserRouter as Router } from "react-router-dom";
import gaugeHistory from "./Components/gaugeHistory";
import inactiveTable from "./Components/inactiveGauge";

function App() {
  return (
    <div className="App">
      {/* <h1 className="align-center">Jindal Saw USA LLC</h1> */}

      {/* <div className="width100">
        <label className="align-center">SLDP Guage Calibration</label>
        <button className="logout float-right ">LogOut</button>
      </div> */}
      <div className="width100">
        <ProductionTable />
      </div>
      <div className="width100">
        <gaugeHistory />
      </div>
      <div className="width100">
        <inactiveTable />
      </div>
    </div>
  );
}

export default App;
