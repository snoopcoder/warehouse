import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";

class NewItemCard extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://127.0.0.1:3001/item", {
      method: "POST",
      body: data
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Название</label>
          <input id="name" name="name" type="text" />
          <label htmlFor="count">Количество</label>
          <input id="count" name="count" type="text" />

          <label htmlFor="comment">Коментарий</label>
          <input id="comment" name="comment" type="text" />

          <button>Send data!</button>
        </form>
      </div>
    );
  }
}

export default NewItemCard;
