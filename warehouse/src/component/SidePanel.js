import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyButton from "./MyButton";

class SidePanel extends Component {
  onClick = Do => {
    // console.log("click");
    this.props.onClick(Do);
  };
  render() {
    console.log(this.props.panelNow["del"]);
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
            <MyButton
              name="add"
              onClick={() => {
                this.onClick("add");
              }}
              disabled={this.props.panelNow["add"]}
              icon="plus"
              color="#ecf0f1"
              textcolor="#2c3e50"
            />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <MyButton
              name="move"
              onClick={() => {
                this.onClick("move");
              }}
              disabled={this.props.panelNow["move"]}
              icon="exchange-alt"
              color="#ecf0f1"
              textcolor="#2c3e50"
            />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <MyButton
              name="edit"
              onClick={() => {
                this.onClick("edit");
              }}
              disabled={this.props.panelNow["edit"]}
              icon="edit"
              color="#ecf0f1"
              textcolor="#2c3e50"
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "5px"
            }}
          >
            <MyButton
              name="del"
              onClick={() => {
                this.onClick("del");
              }}
              disabled={this.props.panelNow["del"]}
              icon="trash-alt"
              color="#FFB1CB"
              textcolor="#2c3e50"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default SidePanel;
