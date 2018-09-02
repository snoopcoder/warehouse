import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";

import ToggleButton from "react-toggle-button";

class EditCountArea extends Component {
  constructor() {
    super();
    this.state = { value: false };
  }

  render() {
    return (
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
          <ToggleButton
            inactiveLabel={"many"}
            thumbStyle={{ borderRadius: 2 }}
            trackStyle={{ borderRadius: 2 }}
            activeLabel={"mach"}
            colors={{
              active: {
                base: "#6c757d",
                hover: "#5A6268"
              },
              inactive: {
                base: "#6c757d",
                hover: "#5A6268"
              }
            }}
            value={this.state.value}
            onToggle={value => {
              this.setState({
                value: !value
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default EditCountArea;
