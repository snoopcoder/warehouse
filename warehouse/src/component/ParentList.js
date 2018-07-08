import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";

class ParentList extends Component {
  render() {
    return (
      <ul>
        {this.props.Items.map((item, i) => (
          <li key={i}>
            <Link to={"/box/" + item.id}>{item.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}
export default ParentList;
