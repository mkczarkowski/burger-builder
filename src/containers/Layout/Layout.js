import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
    this.state = {
      showSideDrawer: document.body.clientWidth < 500,
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
        <Toolbar togglehandleClick={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
