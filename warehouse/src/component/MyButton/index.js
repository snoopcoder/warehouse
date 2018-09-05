import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyButton.css";

class MyButton extends Component {
  onClick = () => {
    // console.log("click");
    this.props.onClick();
  };
  render() {
    return (
      <div
        style={{ background: this.props.color ? this.props.color : "#3f3f6c" }}
        onClick={
          this.props.disabled
            ? () => {
                false;
              }
            : this.onClick
        }
        className={this.props.disabled ? "Button disabled" : "Button"}
      >
        <FontAwesomeIcon
          icon={this.props.icon}
          style={{
            color: this.props.textcolor ? this.props.textcolor : "#FFFFFF"
          }}
        />
      </div>
    );
  }
}

export default MyButton;
