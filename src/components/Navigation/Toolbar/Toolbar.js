import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItemList from "../NavigationItemList/NavigationItemList";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle handleClick={props.togglehandleClick}>MENU</DrawerToggle>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItemList />
    </nav>
  </header>
);

export default toolbar;
