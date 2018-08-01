import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./common.css";
import "./header.css";
import "./ticket-table.css";
var shortid = require("shortid");

class ParentList extends Component {
  render() {
    return (
      // <ul>
      //   {this.props.Items.map((item, i) => (
      //     <li key={shortid.generate()}>
      //       <Link to={"/box/" + item.id}>{item.name}</Link>
      //     </li>
      //   ))}
      // </ul>

      <div className="ticket-table-wrapper">
        <table id="ticket-table">
          <thead>
            <tr>
              <th />
              <th>Фото</th>
              <th>Название</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.Items.map((item, i) => (
              <tr key={shortid.generate()}>
                <td />
                <td>
                  <img src="/noimg_m.jpg" />
                </td>
                <td>
                  <span>
                    <Link to={"/box/" + item.id + "/show"}>{item.name}</Link>
                  </span>
                </td>
                <td />
                <td> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ParentList;
