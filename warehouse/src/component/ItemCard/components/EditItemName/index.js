import React, { Component } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";

class EditItemName extends Component {
  onChange = e => {
    this.props.inputHandler("changeName", e.target.value);
  };
  render() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "-25px",
          width: "320px",
          display: "inline-block"
        }}
      >
        <div
          style={{
            width: "100%",
            display: "inline-block"
          }}
        >
          <InputGroup size="sm">
            <Input
              onChange={this.onChange}
              invalid
              onKeyPress={this._handleKeyPress}
              autoFocus={true}
              style={{
                fontFamily: "Roboto, Helvetica, sans-serif",
                fontSize: "18px"
              }}
              defaultValue={this.props.Items.name}
            />
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default EditItemName;
