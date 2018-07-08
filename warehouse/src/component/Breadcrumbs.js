import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./Breadcrumbs.css";

class Breadcrumbs extends Component {
  render() {
    return (
      <ul className="hr">
        {this.props.Items.map((item, i) => (
          <li key={i}>
            <Link to={"/box/" + item.BOX}>{item.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Breadcrumbs;
