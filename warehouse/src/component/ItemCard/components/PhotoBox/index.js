import React, { Component } from "react";
import PhotoBig from "./components/PhotoBig";
import PhotoGalleryItem from "./components/PhotoGalleryItem";
import ImageUploader from "./components/ImageUploader";
import ItemViewer from "./components/ItemViewer";

//import PhotoBoxHoc from "../../../hoc/PhotoBoxHoc.js";

import "./PhotoBox.css";

class PhotoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_img: props.Items.item_img,
      img: props.Items.item_img ? props.Items.item_img.split(" ") : [],
      index: 0,
      files: [],
      ImageData
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

  ImageReadyFunc = (name, blob, loadstatus) => {
    //эта функция должна получить от хока блоб, имя файла, и статус его загрузки
    let ImageData = this.state.ImageData[name];
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

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
      <div id="PhotoBoxContainerEdit">
        <ImageUploader ImageProssing={this.props.ImageProssing} />
        {/* отобразить сначала картинки уже пренадлежащие предмету, а после вывести структуру item_img_RAW */}
        {this.state.img.map((img, i) => (
          <div key={img.toString()}>
            <ItemViewer
              img={"http://127.0.0.1:3001/public/" + img}
              loadstatus=""
            />
          </div>
        ))}
        <ItemViewer
          img="https://drscdn.500px.org/photo/273678235/q%3D80_m%3D1000/v2?webp=true&sig=c22f764a09d5be881dd5323c73a617c3bfe39560bd4c2bcea62679a375871e61"
          loadstatus=""
        />
      </div>
    );

    return <div>{this.props.EditMode ? EditMode : NormalMode}</div>;
  }
}

export default PhotoBox;
