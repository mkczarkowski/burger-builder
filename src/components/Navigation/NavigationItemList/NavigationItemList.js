import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItemList.css";

const navigationItemList = props => (
  <ul className={classes.NavigationItemList}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItemList;
