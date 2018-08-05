import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./common.css";
import "./header.css";
import "./ticket-table.css";

class contentTable extends Component {
  render() {
    return (
      <div className="ticket-table-wrapper">
        <table id="ticket-table">
          <thead>
            <tr>
              <th />
              <th>Фото</th>
              <th>Название</th>
              <th>количество</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.Items.map((item, i) => (
              <tr key={i}>
                <td>
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="checkbox__text" />
                  </label>
                </td>
                <td>
                  <img
                    alt=""
                    src={
                      item.item_img && item.item_img != ""
                        ? "http://127.0.0.1:3001/public/logo_" + item.item_img
                        : "/noimg_m.jpg"
                    }
                  />
                </td>
                <td>
                  <span>
                    <Link to={"/box/" + item.item_id + "/show"}>
                      {item.name}
                    </Link>
                  </span>
                </td>
                <td>{item.item_count}</td>
                <td> {item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default contentTable;
