import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "./jindalbanner.png";
const JHeader = () => {
  return (
    <div>
      <Link
        to={{
          pathname: "/productionTable",
        }}
      >
        <img id="banner" className="banner" src={logo}></img>
      </Link>

      <h1 className="align-center">Jindal Saw USA LLC</h1>
      <div className="width100">
        <h5 className="align-center">Supplying Tubular Goods And Services</h5>
      </div>
    </div>
  );
};
export default JHeader;
