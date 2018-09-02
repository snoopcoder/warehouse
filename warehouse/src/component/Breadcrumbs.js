import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./Breadcrumbs.css";
var shortid = require("shortid");

class Breadcrumbs extends Component {
  render() {
    let main = null;
    if (!this.props.Items) {
      main = (
        <ul id="breadcrumb">
          <li className="title">
            {String.fromCharCode(62) + String.fromCharCode(62)}
          </li>
        </ul>
      );
    } else {
      main = (
        <ul id="breadcrumb">
          <li key={shortid.generate()}>
            <Link to="/box/0/show">
              {String.fromCharCode(62) + String.fromCharCode(62)}
            </Link>
          </li>
          {this.props.Items.map((item, i) => (
            <li key={shortid.generate()}>
              <Link to={"/box/" + item.BOX + "/show"}>{item.name}</Link>
            </li>
          ))}
          <li key={shortid.generate()} className="title">
            {this.props.Name}
          </li>
        </ul>
      );
    }
    return <div>{main}</div>;
  }
}

export default Breadcrumbs;
