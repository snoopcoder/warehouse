import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";

/*
    items: {
      id: "",
      type: "",
      name: "",
      date: "",
      count: "",
      breadcrumbs: "",
      imgUrl: "/noimg_m.jpg",
      content: ""
    }
     */
class ItemCard extends Component {
  render() {
    return (
      <div>
        <div>{this.props.Items.name}</div>
        <div>Количество:{this.props.Items.count}</div>
        <div>
          <img
            alt=""
            src={
              this.props.Items.item_img && this.props.Items.item_img != ""
                ? "http://127.0.0.1:3001/public/" + this.props.Items.item_img
                : "/noimg_m.jpg"
            }
          />
        </div>
        <div>Дата инвертаризации:{this.props.Items.date}</div>
        <div>Коментарий:{this.props.Items.comment}</div>
      </div>
    );
  }
}
export default ItemCard;
