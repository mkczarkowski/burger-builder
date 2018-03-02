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
        const arrOfOrders = Object.values(orders); // Convert object containing orders  to array of orders

        this.setState(prevState => ({
          orders: [...prevState.orders, ...arrOfOrders]
        }));
      })
      .catch(() => this.setState({ hasErrorOccurred: true }));
  }
  render() {
    let ordersContent = this.state.hasErrorOccurred ? (
      <p style={{ textAlign: "center" }}>Orders can't be loaded</p>
    ) : this.state.orders.length > 0 ? (
      this.state.orders.map(({ ingredients, price}) => {
        return <Order ingredients={ingredients} price={price} key={price + Math.random()} />;
      })
    ) : (
      <Spinner />
    );
    return <div>{ordersContent}</div>;
  }
}

export default Orders;
