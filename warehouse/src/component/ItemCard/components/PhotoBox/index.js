import React, { Component } from "react";
import PhotoBig from "./components/PhotoBig";
import PhotoGalleryItem from "./components/PhotoGalleryItem";
import ImageUploader from "./components/ImageUploader";
import ItemViewer from "./components/ItemViewer";

import PhotoBoxHoc from "../../../hoc/PhotoBoxHoc.js";

import "./PhotoBox.css";

class PhotoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_img: props.Items.item_img,
      img: props.Items.item_img ? props.Items.item_img.split(" ") : [],
      index: 0,
      files: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.Items.item_img != prevState.item_img) {
      return {
        item_img: nextProps.Items.item_img,
        img: nextProps.Items.item_img.split(" "),
        index: 0
      };
    }
    return null;
  }

  onClick = i => {
    this.setState({ index: i });
  };

  ImageProssing = file => {
    let files = this.state.fales;
    //ToDo подумать над случаем кошгда добавляются одинаковые фотографии
    files.push(file);
    this.setState({ files });
  };

  render() {
    const GalleryItems = (
      <div id="GalleryList">
        {this.state.img.length === 1
          ? ""
          : this.state.img.map((img, i) => (
              <div key={img.toString()}>
                <PhotoGalleryItem
                  img={"http://127.0.0.1:3001/public/logo_" + img}
                  onClick={() => {
                    this.onClick(i);
                  }}
                />
              </div>
            ))}
      </div>
    );

    let NormalMode = (
      <div id="PhotoBoxContainer">
        <div id="BigPhoto">
          <PhotoBig
            img={
              "http://127.0.0.1:3001/public/" + this.state.img[this.state.index]
            }
          />
        </div>
        <div id="Gallery">{GalleryItems}</div>
      </div>
    );
    //------

    let EditMode = (
      <div id="EditDiv">
        <ImageUploader ImageProssing={this.ImageProssing} />
        <ItemViewer />
      </div>
    );

    return <div>{this.props.EditMode ? EditMode : NormalMode}</div>;
  }
}

export default PhotoBoxHoc(PhotoBox);
