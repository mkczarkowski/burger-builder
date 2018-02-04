import React from "react";
import PropTypes from "prop-types";

import Logo from "../../Logo/Logo";
import NavigationItemList from "../NavigationItemList/NavigationItemList";
import classes from "./SideDrawer.css";

const sideDrawer = props => {
  // ...
  return (
    <div className={classes.SideDrawer}>
      <Logo height="80%" />
      <nav>
        <NavigationItemList />
      </nav>
    </div>
  );
};

export default sideDrawer;
