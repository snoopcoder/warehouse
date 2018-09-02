import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyButton from "./MyButton";

class SidePanel extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", display: "inline-block" }}>
        <div>
          <FontAwesomeIcon
            icon="bars"
            style={{
              color: "#3e5771",
              marginTop: "20px",
              display: "inline-block"
            }}
          />
        </div>
        <div style={{ marginTop: "25px" }}>
          <div style={{ marginBottom: "5px" }}>
            <MyButton icon="plus" color="#ecf0f1" textcolor="#2c3e50" />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <MyButton icon="exchange-alt" color="#ecf0f1" textcolor="#2c3e50" />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <MyButton icon="edit" color="#ecf0f1" textcolor="#2c3e50" />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "5px"
            }}
          >
            <MyButton icon="trash-alt" color="#FFB1CB" textcolor="#2c3e50" />
          </div>
        </div>
      </div>
    );
  }
}
export default SidePanel;
