import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import onClickOutside from "react-onclickoutside";
import "./MachCount.css";

let MachArr = ["мало", "много"];

class MachCount extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      edit: false
    };
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

  onClick = target => {
    switch (target) {
      case "view": {
        console.log("click");
        this.setState({ edit: true });

        break;
      }
      case "ok": {
        console.log("must save");
        this.setState({ edit: false });
        break;
      }
      case "few": {
        console.log("few");
        break;
      }
      case "mach": {
        console.log("mach");
        break;
      }
    }
  };
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
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
        <div onClick={() => this.onClick("view")}>
          {MachArr[this.props.count]}
        </div>
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
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle caret size="sm">
                {MachArr[this.props.count]}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={e => this.onClick("few")}>
                  мало
                </DropdownItem>
                <DropdownItem onClick={e => this.onClick("mach")}>
                  много
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Button
            size="sm"
            color="success"
            style={{ display: "inline-block", marginLeft: "5px" }}
            onClick={() => this.onClick("ok")}
          >
            ok
          </Button>
        </div>
      );
    }
    return main;
  }
}

export default onClickOutside(MachCount);
