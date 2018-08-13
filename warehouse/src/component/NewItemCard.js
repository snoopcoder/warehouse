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
  Segment,
  MenuItem
} from "@material-ui/core";
import axios from "axios";
import Loadable from "react-loading-overlay";
import "./NewItemCard.css";
import PropTypes from "prop-types";

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

const countOptions = [
  {
    value: "1шт",
    label: "1шт"
  },
  {
    value: "много",
    label: "много"
  },
  {
    value: "мало",
    label: "мало"
  }
];

class NewItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      file: "",
      nameInput: "",
      // nameInputError: false,
      countInput: "1шт",
      TextAreaInput: "",
      formValid: false,
      nameValid: false,
      FirstTime: true
    };
  }

  // handleUserInput = (e, obje) => {
  //   if (obje) {
  //     const name = obje.name;
  //     let value = obje.value;
  //     if (name == "countInput") {
  //       for (let item of this.state.stateOptions) {
  //         if (item.value === value) value = item.text;
  //       }
  //     }
  //     this.setState({ [name]: value }, () => {
  //       this.validateField(name, value);
  //     });
  //   }
  // };

  handleChange = name => event => {
    let val = event.target.value;
    this.setState(
      {
        [name]: val
      },
      () => {
        this.validateField(name, val);
      }
    );
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

  Submit = () => {
    let obj = {};
    obj.myFile = this.state.file;
    obj.nameInput = this.state.nameInput;
    obj.countInput = this.state.countInput;
    obj.TextAreaInput = this.state.TextAreaInput;
    obj.parentId = this.props.parentId;
    this.props.handleSubmit(obj);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ load: true });
    this.Submit();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.FirstTime) this.setState({ FirstTime: false });
    if (this.props.mode === "save") this.Submit();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //обработка отключения кнопки сохранить,nameValid и formValid могут быть не равны только при начальной отрисовки для красоты, когда имя еще не вводили, и поэтому не надо показывать ошибку
    if (
      nextProps.nameValid !== prevState.formValid &&
      prevState.nameInput.length > 0
    ) {
      return {
        formValid: nextProps.nameValid
      };
    }
    if (nextProps.mode === "save") {
      return {
        load: true
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
            <ImageUpload onChange={this.handleChange("file")} />
          </div>
          <div className="nameText name-count-comm-Text">Название</div>
          <div className="nameInput name-count-comm-Input">
            <TextField
              error={this.state.FirstTime ? false : !this.props.nameValid}
              id="nameInput"
              name="nameInput"
              //error={!this.props.nameValid}
              className={classes.textField}
              onChange={this.handleChange("nameInput")}
              //value={this.state.nameInput}
            />
          </div>
          <div className="countText name-count-comm-Text">Количество</div>
          <div className="countInput name-count-comm-Input">
            <TextField
              id="select-currency"
              select
              className={classes.textField}
              value={this.state.countInput}
              onChange={this.handleChange("countInput")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              InputProps={{
                readOnly: true
              }}
            >
              {countOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

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
              <TextField
                id="textarea"
                placeholder="необязательный"
                multiline
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("TextAreaInput")}
              />
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
          disabled={!this.props.nameValid}
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
NewItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NewItemCard);
//export default withRouter(NewItemCard);
