import React, { Component } from "react";
import axios from "../../../config/axios/axios-orders";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    hasErrorOccurred: false
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(({ data: orders }) => {
        this.setState({ orders: [orders] });
      })
      .catch(() => this.setState({ hasErrorOccurred: true }));
  }
  render() {
    let ordersContent = this.state.hasErrorOccurred ? (
      <p style={{ textAlign: "center" }}>Orders can't be loaded</p>
    ) : this.state.orders ? (
      this.state.orders.map(order => {
        let ingredients = {};
        let price = 0;
        let key = "";
        for (let orderId of Object.keys(order)) {
          // Access nested order content via outer firebase id property
          ingredients = order[orderId].ingredients;
          price = order[orderId].price;
          key = orderId; // Use firebase id as key for Order component
        }
        return <Order {...ingredients} price={price} key={key} />;
      })
    ) : (
      <Spinner />
    );
    return <div>{ordersContent}</div>;
  }
}

export default Orders;
