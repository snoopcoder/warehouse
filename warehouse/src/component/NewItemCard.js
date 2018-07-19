import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import ImageUpload from "./ImageUpload.js";
import { Button, Input } from "semantic-ui-react";
import "./semantic.min.css";
import "./NewItemCard.css";

class NewItemCard extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://127.0.0.1:3001/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    });
  }
  /*
            
          <label htmlFor="name">Название</label>
          <input id="name" name="name" type="text" />
          <label htmlFor="count">Количество</label>
          <input id="count" name="count" type="text" />

          <label htmlFor="comment">Коментарий</label>
          <input id="comment" name="comment" type="text" /> */
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="NewItemCard">
            <ImageUpload />
            <div className="NewItemCardCaption">
              <Input placeholder="Название" />
            </div>
            <div className="NewItemCardCount">
              <Input placeholder="Количество" />
            </div>
            <div className="NewItemCardComment">
              <Input placeholder="Коментарий" />
            </div>
          </div>

          <button>Send data!</button>
        </form>
      </div>
    );
  }
}

export default NewItemCard;
