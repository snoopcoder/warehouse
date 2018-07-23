import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import React, { Component } from "react";
import ImageUpload from "./ImageUpload.js";
import { Button, Input, Dropdown, TextArea, Form } from "semantic-ui-react";
import "./semantic.min.css";
import "./NewItemCard.css";

class NewItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      nameInputError: false,
      countInput: "1шт",
      TextAreaInput: "",
      stateOptions: [
        { key: "one", value: "one", text: "1шт" },
        { key: "much", value: "much", text: "много" },
        { key: "few", value: "few", text: "мало" }
      ],
      formValid: false,
      nameValid: false
    };
  }

  handleUserInput = (e, obje) => {
    if (obje) {
      const name = obje.name;
      let value = obje.value;
      if (name == "countInput") {
        for (let item of this.state.stateOptions) {
          if (item.value == value) value = item.text;
        }
      }
      this.setState({ [name]: value }, () => {
        this.validateField(name, value);
      });
    }
  };

  validateField = (name, value) => {
    switch (name) {
      case "nameInput": {
        this.props.checkName(value);
      }
      default: {
      }
    }
    console.log(name, value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/box/" + this.props.parentId);
    // console.log(this.state.nameInput);
    // const data = new FormData(event.target);

    // fetch("http://127.0.0.1:3001/item", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: data
    // });
  };
  /*
            
          <label htmlFor="name">Название</label>
          <input id="name" name="name" type="text" />
          <label htmlFor="count">Количество</label>
          <input id="count" name="count" type="text" />

          <label htmlFor="comment">Коментарий</label>
          <input id="comment" name="comment" type="text" /> */
  static getDerivedStateFromProps(nextProps, prevState) {
    //обработка отключения кнопки сохранить
    if (
      nextProps.nameValid != prevState.formValid &&
      prevState.nameInput.length > 0
    ) {
      return {
        formValid: nextProps.nameValid
      };
    }
    // No state update necessary
    return null;
  }
  render() {
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
                id="nameInput"
                name="nameInput"
                error={!this.props.nameValid}
                placeholder="Короткое описание"
                onChange={this.handleUserInput}
              />
            </div>
            <div className="countText name-count-comm-Text">Количество</div>
            <div className="countInput name-count-comm-Input">
              <Dropdown
                name="countInput"
                placeholder="Количество"
                selection
                defaultValue="one"
                options={this.state.stateOptions}
                onChange={this.handleUserInput}
              />
            </div>
            <div className="commText name-count-comm-Text">Комментарий</div>
            <div className="commInput name-count-comm-Input">
              <div>
                <TextArea
                  name="TextAreaInput"
                  id="TextAreaInput"
                  autoHeight
                  placeholder="Можно внести необязательный комментарий"
                  onChange={this.handleUserInput}
                />
              </div>
            </div>
          </div>

          <Button disabled={!this.state.formValid} type="submit" value="Submit">
            Сохранить
          </Button>
          <Link to={"/box/" + this.props.parentId}>
            <Button>Отмена</Button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(NewItemCard);
