import React, { Component } from "react";
import ManyCount from "./components/ManyCount";
import MachCount from "./components/MachCount";

class CountArea extends Component {
  render() {
    return (
      <div>
        {this.props.CountType === "many" ? (
          <ManyCount {...this.props} />
        ) : (
          <MachCount {...this.props} />
        )}
      </div>
    );
  }
}

export default CountArea;
