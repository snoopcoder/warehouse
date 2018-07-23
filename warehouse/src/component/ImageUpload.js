import React, { Component } from "react";
import "./ImageUpload.css";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.onChange(e, { name: "file", value: file });
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    /*
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    */
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img className="previewImgIcon" src={imagePreviewUrl} />;
    } else {
      $imagePreview = "Drag or click";
    }

    /*      <div className="previewComponent">
        <input
          className="fileInput"
          type="file"
          onChange={e => this._handleImageChange(e)}
        />
 */

    return (
      <div className="ImageUpload">
        <input
          type="file"
          accept="image/jpeg"
          onChange={e => this._handleImageChange(e)}
        />
        <div className="DivPreview">{$imagePreview}</div>
      </div>
    );
  }
}

export default ImageUpload;
