import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItemList from "../NavigationItemList/NavigationItemList";
import classes from "./Toolbar.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo height="80%" />
    <nav>
      <NavigationItemList />
    </nav>
  </header>
);

export default toolbar;
