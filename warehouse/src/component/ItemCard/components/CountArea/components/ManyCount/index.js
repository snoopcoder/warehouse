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
    this.state = { edit: false };
  }

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({ edit: false });
      console.log("do validate");
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
      main = <div onClick={this.onClick}>{this.props.count + "шт"}</div>;
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
