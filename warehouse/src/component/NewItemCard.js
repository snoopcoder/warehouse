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
  TextField,
  Form,
  Dimmer,
  withStyles,
  Loader,
  Image,
  Segment
} from "@material-ui/core";
import axios from "axios";
import Loadable from "react-loading-overlay";
import "./NewItemCard.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

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
          if (item.value === value) value = item.text;
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
        break;
      }
      default: {
      }
    }
  };

  End = () => {
    this.history.push("/box/" + this.props.match.params.id + "/show");
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ load: true });
    let obj = {};
    obj.myFile = this.state.file;
    obj.nameInput = this.state.nameInput;
    obj.countInput = this.state.countInput;
    obj.TextAreaInput = this.state.TextAreaInput;
    obj.parentId = this.props.parentId;
    this.props.handleSubmit(obj);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //обработка отключения кнопки сохранить
    if (
      nextProps.nameValid !== prevState.formValid &&
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
    const { classes } = this.props;
    let MyForm = (
      <form>
        <div className="NewItemCard">
          <div className="image">
            <ImageUpload onChange={this.handleUserInput} />
          </div>
          <div className="nameText name-count-comm-Text">Название</div>
          <div className="nameInput name-count-comm-Input">
            <TextField
              error="true"
              id="nameInput"
              name="nameInput"
              error={!this.props.nameValid}
              label="Название"
              className={classes.textField}
              onChange={this.handleUserInput}
              //value={this.state.nameInput}
            />
          </div>
          <div className="countText name-count-comm-Text">Количество</div>
          <div className="countInput name-count-comm-Input">
            {/* <Dropdown
              name="countInput"
              placeholder="Количество"
              selection
              defaultValue="one"
              options={this.state.stateOptions}
              onChange={this.handleUserInput}
            /> */}
          </div>
          <div className="commText name-count-comm-Text">Комментарий</div>
          <div className="commInput name-count-comm-Input">
            <div>
              {/* <TextArea
                name="TextAreaInput"
                id="TextAreaInput"
                autoHeight
                placeholder="Можно внести необязательный комментарий"
                onChange={this.handleUserInput}
              /> */}
            </div>
          </div>
        </div>

        <Button
          disabled={!this.state.formValid}
          onClick={this.handleSubmit}
          value="Submit"
        >
          Сохранить
        </Button>
        <Link to={"/box/" + this.props.parentId + "/show"}>
          <Button>Отмена</Button>
        </Link>
      </form>
    ); // if (this.state.load)
    let main = (
      <Loadable active={this.state.load} spinner text="Loading...">
        {MyForm}
      </Loadable>
    );

    return <div> {main}</div>;
  }
}
export default withStyles(styles)(NewItemCard);
//export default withRouter(NewItemCard);
