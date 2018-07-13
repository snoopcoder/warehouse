import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./Breadcrumbs.css";
var shortid = require("shortid");

class Breadcrumbs extends Component {
  render() {
    let main = null;
    if (!this.props.Items) {
      main = (
        <ul className="hr">
          <li>{String.fromCharCode(62) + String.fromCharCode(62)}</li>
        </ul>
      );
    } else {
      main = (
        <ul className="hr">
          <li key={shortid.generate()}>
            <Link to="/box/0">
              {String.fromCharCode(62) + String.fromCharCode(62)}
            </Link>
          </li>
          {this.props.Items.map((item, i) => (
            <li key={shortid.generate()}>
              <Link to={"/box/" + item.BOX}>{item.name}</Link>
            </li>
          ))}
          <li key={shortid.generate()}>{this.props.Name}</li>
        </ul>
      );
    }
    return <div>{main}</div>;
  }
}

export default Breadcrumbs;
