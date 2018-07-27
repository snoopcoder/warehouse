import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import React, { Component } from "react";
import ImageUpload from "./ImageUpload.js";
import {
  Button,
  Input,
  Dropdown,
  TextArea,
  Form,
  Dimmer,
  Loader,
  Image,
  Segment
} from "semantic-ui-react";
import axios from "axios";
import "./semantic.min.css";
import "./NewItemCard.css";

class NewItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      file: "",
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

  End = () => {
    this.props.history.push("/box/" + this.props.match.params.id);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ load: true });
    let obj = {};

    // this.props.history.push("/box/" + this.props.parentId);
    // // console.log(this.state.nameInput);
    // const data = new FormData();
    // data.append("myFile", this.state.file, "logo.jpg");
    // data.append("nameInput", this.state.nameInput);
    // data.append("countInput", this.state.countInput);
    // data.append("TextAreaInput", this.state.TextAreaInput);
    // data.append("parentId", this.props.parentId);
    // axios.post("http://127.0.0.1:3001/item", data);

    //this.props.history.push("/box/" + this.props.parentId);
    // console.log(this.state.nameInput);

    obj.myFile = this.state.file;
    obj.nameInput = this.state.nameInput;
    obj.countInput = this.state.countInput;
    obj.TextAreaInput = this.state.TextAreaInput;
    obj.parentId = this.props.parentId;
    this.props.handleSubmit(obj, this.End);
  };

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
    let MyForm = (
      <form onSubmit={this.handleSubmit}>
        <div className="NewItemCard">
          <div className="image">
            <ImageUpload onChange={this.handleUserInput} />
          </div>
          <div className="nameText name-count-comm-Text">Название</div>
          <div className="nameInput name-count-comm-Input">
            <Input
              id="nameInput"
              name="nameInput"
              error={!this.props.nameValid}
              placeholder="Короткое описание"
              onChange={this.handleUserInput}
              value={this.state.nameInput}
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
    );
    let main = null;
    if (this.state.load) {
      main = (
        <Segment>
          <Dimmer active inverted>
            <Loader active inverted>
              Loading
            </Loader>
          </Dimmer>
          {MyForm}
        </Segment>
      );
    } else {
      main = MyForm;
    }

    return <div> {main}</div>;
  }
}

export default withRouter(NewItemCard);
