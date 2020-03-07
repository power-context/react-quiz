import React from "react";
import classes from "./Loader.module.css";

const Loader = () => (
  <div className={classes.center}>
    <div className={classes["lds-dual-ring"]}></div>
  </div>
);

export default Loader;
