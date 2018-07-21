import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import ImageUpload from "./ImageUpload.js";
import { Button, Input, Dropdown, TextArea, Form } from "semantic-ui-react";
import "./semantic.min.css";
import "./NewItemCard.css";

class NewItemCard extends Component {
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e);
  }
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
    let stateOptions = [
      { key: "one", value: "one", text: "1шт" },
      { key: "much", value: "much", text: "много" },
      { key: "few", value: "few", text: "мало" }
    ];
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="NewItemCard">
            <div className="image">
              <ImageUpload />
            </div>
            <div className="nameText name-count-comm-Text">Название</div>
            <div className="nameInput name-count-comm-Input">
              <Input
                id="InputnameInput"
                name="InputnameInput"
                label={{ icon: "asterisk" }}
                labelPosition="left corner"
                placeholder="Короткое описание"
                onChange={this.handleUserInput}
              />
            </div>
            <div className="countText name-count-comm-Text">Количество</div>
            <div className="countInput name-count-comm-Input">
              <Dropdown
                placeholder="Количество"
                selection
                defaultValue="one"
                options={stateOptions}
              />
            </div>
            <div className="commText name-count-comm-Text">Комментарий</div>
            <div className="commInput name-count-comm-Input">
              <div>
                <TextArea
                  id="TextAreacommInput"
                  autoHeight
                  placeholder="Можно внести необязательный комментарий"
                />
              </div>
            </div>
          </div>

          <button type="submit">Send data!</button>
        </form>
      </div>
    );
  }
}

export default NewItemCard;
