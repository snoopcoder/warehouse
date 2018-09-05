import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";
import onClickOutside from "react-onclickoutside";
import "./ManyCount.css";

class ManyCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      countTemp: props.Items.count_many
    };
  }

  handleSubmit = () => {
    this.setState({ edit: false });
    if (this.state.countTemp !== this.props.Items.count_many) {
      this.props.inputHandler("changeManyCount", this.state.countTemp, true);
    }
  };

  onChange = e => {
    this.setState({ countTemp: e.target.value });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSubmit();
      return;
    }
    let intRegex = /^\d/;
    if (!intRegex.test(e.key)) {
      e.preventDefault();
    }
  };

  handleClickOutside = evt => {
    // ..handling code goes here...
    console.log("unclick");
    this.setState({ edit: false });
  };

  onClick = () => {
    console.log("click");
    this.setState({ edit: true });
  };

  /*
  
                      <InputGroup size="sm">
                      <Input />
                      <InputGroupAddon addonType="append">шт</InputGroupAddon>
                    </InputGroup>
  
  */
  render() {
    let main = "";
    if (this.state.edit === false) {
      main = (
        <div onClick={this.onClick}>{this.props.Items.count_many + "шт"}</div>
      );
    } else {
      main = (
        <div
          style={{
            position: "absolute",
            bottom: "-25px",
            width: "170px",
            display: "inline-block"
          }}
        >
          <div
            style={{
              width: "80px",
              display: "inline-block"
            }}
          >
            <InputGroup size="sm">
              <Input
                onChange={this.onChange}
                defaultValue={this.props.Items.count_many}
                onKeyPress={this._handleKeyPress}
                autoFocus={true}
                style={{
                  fontFamily: "Roboto, Helvetica, sans-serif",
                  fontSize: "18px"
                }}
              />
              <InputGroupAddon addonType="append">шт</InputGroupAddon>
            </InputGroup>
          </div>
          <Button
            onClick={this.handleSubmit}
            size="sm"
            color="success"
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            ok
          </Button>
        </div>
      );
    }
    return main;
  }
}

export default onClickOutside(ManyCount);
