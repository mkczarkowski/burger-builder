import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Logo from "../../Logo/Logo";
import NavigationItemList from "../NavigationItemList/NavigationItemList";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.css";

const sideDrawer = props => {
  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close
  ].join(" ");

  return (
    <Fragment>
      <Backdrop show={props.open} handleClick={props.closed} />
      <div className={attachedClasses}>
        <Logo height="11%" />
        <nav>
          <NavigationItemList />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
