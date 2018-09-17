import React, { Component } from "react";
import classNames from "classnames";

import "./ImageUploader.css";

class UploadingTo extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35.808 35.808"
        width="32"
        height="32"
      >
        <g>
          <path
            d="M30.885,16.314c0.174-0.686,0.275-1.404,0.275-2.145c0-4.66-3.785-8.439-8.447-8.439C17.32,5.738,16.6,9.841,16.6,9.841   s-2.266-2.797-6.262-2.316c-3.598,0.717-5.947,3.953-5.947,7.254c0,0.568,0.08,1.111,0.229,1.639C1.922,17.403,0,19.997,0,23.031   c0,3.891,3.154,7.045,7.047,7.045h7.555v-9.5h-3.221l6.605-6.447l6.441,6.604h-3.221v9.344h7.553c3.896,0,7.049-3.154,7.049-7.045   C35.809,19.876,33.736,17.21,30.885,16.314z"
            fill="#D80027"
          />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    );
  }
}

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      dropzoneIsHovered: false
    };
  }

  _handleImageChange(e) {
    e.preventDefault();
    this.props.ImageProssing(e.target.files);

    // let file = e.target.files[0];
    // //Это мой костыльный эвент. так как оригинал передавать нельзя, браузел его обнуляет
    // let event = {};
    // event.target = {};
    // event.target.value = file;

    // reader.onloadend = () => {
    //   this.props.onChange(event);
    //   this.setState({
    //     imagePreviewUrl: reader.result
    //   });
    // };

    // reader.readAsDataURL(file);
  }

  dropzoneHoverHandler = () => {
    this.setState({ dropzoneIsHovered: !this.state.dropzoneIsHovered });
    let sdf;
  };

  render() {
    return (
      <div class="center">
        <div class="bar" />
        <div class="Uploadertitle">Uploader</div>
        <div class="Uploaderbody">
          <div
            onDragEnter={this.dropzoneHoverHandler}
            onDragLeave={this.dropzoneHoverHandler}
            className={classNames("dropzone", {
              "is-dragover": this.state.dropzoneIsHovered
            })}
          >
            <div class="content">
              <img
                src="http://100dayscss.com/codepen/upload.svg"
                class="upload"
              />
              <span class="filename"> Drop or Сlick </span>
              <input
                type="file"
                class="input"
                multiple
                accept="image/jpeg"
                onChange={e => this._handleImageChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
