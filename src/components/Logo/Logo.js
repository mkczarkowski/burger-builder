import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = ({height}) => (
  <div className={classes.Logo} style={{height}}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

logo.defaultProps = {
  height: "80%"
};

export default logo;
