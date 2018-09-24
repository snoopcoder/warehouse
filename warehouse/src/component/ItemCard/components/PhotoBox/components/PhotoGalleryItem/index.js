import React, { Component } from "react";
import "./PhotoGalleryItem.css";

class PhotoGalleryItem extends Component {
  render() {
    return (
      <div className="imgPhotoGallery">
        <img
          class="imgPhotoGalleryItem"
          src={this.props.img}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}
//this.props.PhotoArr.map()

export default PhotoGalleryItem;
