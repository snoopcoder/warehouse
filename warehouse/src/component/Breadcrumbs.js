import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "./Breadcrumbs.css";
var shortid = require("shortid");

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: props.Items
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //это для предотвращения рывка перерисовки, когда данные списка еще не пришли с сервера, и на его месте калач. без этого своеобразного
    //буфера данных будет отрисока при отсутвии данных, а это случай отрисовки рута. поэтому во время всех переходов крошки будут дергаться на
    //перересовку рутовой дорожки
    if (!nextProps.updateDisabled) {
      return {
        Items: nextProps.Items
      };
    }

    return null;
  }

  render() {
    let main = null;
    if (!this.state.Items) {
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
          {this.state.Items.map((item, i) => (
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
