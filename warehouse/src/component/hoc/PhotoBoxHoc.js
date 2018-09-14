import React from "react";
import _ from "lodash";

function PhotoBoxHoc(Component, apiUrl) {
  class PhotoBoxHocClass extends React.Component {
    state = {
      changeObj: {}
    };

    componentDidMount() {}

    render() {
      return <Component {...this.props} />;
    }
  }

  PhotoBoxHocClass.displayName = `PhotoBoxHocClass(${Component.displayName ||
    Component.name ||
    "Component"})`;

  return PhotoBoxHocClass;
}

export default PhotoBoxHoc;
