import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "./ItemViewer.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

const Fader = ({ children }) => (
  <CSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={1000}
    transitionLeaveTimeout={500}
  >
    {children}
  </CSSTransitionGroup>
);

class IconUmbrella extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 511.999 511.999"
      >
        <path
          id="Layer_1"
          d="M384.955,256l120.28-120.28c9.019-9.019,9.019-23.642,0-32.66L408.94,6.765	c-9.019-9.019-23.642-9.019-32.66,0l-120.28,120.28L135.718,6.765c-9.019-9.019-23.642-9.019-32.66,0L6.764,103.058	c-9.019,9.019-9.019,23.642,0,32.66l120.28,120.28L6.764,376.28c-9.019,9.019-9.019,23.642,0,32.66l96.295,96.294	c9.019,9.019,23.642,9.019,32.66,0l120.28-120.28l120.28,120.28c9.019,9.019,23.642,9.019,32.66,0l96.295-96.294	c9.019-9.019,9.019-23.642,0-32.66L384.955,256z"
          fill="#ce5151"
        />
      </svg>
    );
  }
}

class ItemViewer extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      height: 100,
      show: true
    };
  }

  onClick = () => {
    let height = this.state.height;
    if (height === 0) this.setState({ showDelete: true });
    else height -= 20;

    this.setState({ height });
  };

  onClick1 = () => {
    this.setState({ show: !this.state.show });
    console.log("delete now");
  };

  render() {
    let Loader = (
      <div class="img-overlay" style={{ height: `${this.state.height}%` }} />
    );
    let Dropper = (
      <div class="img-overlay1" onClick={this.onClick1}>
        <IconUmbrella />
      </div>
    );

    let LoaderClass = this.state.showDelete ? "img1" : "img";
    let GaleryItem = (
      <div
        style={{
          background: `url(${this.props.img}) no-repeat center top`
        }}
        className={LoaderClass}
        onClick={this.onClick}
      >
        {this.state.showDelete ? Dropper : Loader}
      </div>
    );

    return (
      <div>
        <div>
          <Fader>{this.state.show ? GaleryItem : ""}</Fader>
        </div>
      </div>
    );
  }
}
export default ItemViewer;
