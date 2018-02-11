import React, {Fragment, Component} from "react";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

class Modal extends Component {
  shouldComponentUpdate({show: nextShow, children: nextChildren}) {
   return nextShow !== this.props.show || nextChildren !== this.props.children;
  }

  componentWillUpdate() {
    console.log("[CWU] Test");
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} handleClick={this.props.handleClick}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : 0
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
