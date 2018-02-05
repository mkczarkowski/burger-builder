import React, { Component, Fragment } from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
    this.state = {
      showSideDrawer: true
    };
  }

  sideDrawerToggleHandler() {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false });
  }

  render() {
    return (
      <Fragment>
        <Toolbar toggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
