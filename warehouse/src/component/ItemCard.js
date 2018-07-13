import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";

class ItemCard extends Component {
  render() {
    return (
      <div>
        <div>{}</div>
        <div>Дата:{this.props.OnData}</div>
        <div>Количество:{this.props.Count}</div>
        <div>картинка</div>
        <div>Коментарий:{this.props.Comment}</div>
      </div>
    );
  }
}
export default ItemCard;
