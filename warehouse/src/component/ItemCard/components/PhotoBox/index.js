import React, { Component } from "react";
import PhotoBig from "./components/PhotoBig";
import PhotoGalleryItem from "./components/PhotoGalleryItem";
import "./PhotoBox.css";

let PhotoArr = [
  "http://127.0.0.1:3001/public/aba964dd-c4e7-40bf-8c38-7fff9022a95c.jpg",
  "http://127.0.0.1:3001/public/2ecb6499-40ee-4447-96d1-8e6f4a1543af.jpg",
  "http://127.0.0.1:3001/public/931aa8db-e803-4764-bbd5-06d2d750af30.jpg"
];

class PhotoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_img: props.Items.item_img,
      img: props.Items.item_img ? props.Items.item_img.split(" ") : [],
      index: 0
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

  render() {
    console.log(this.state.img.length);
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

    return (
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
  }
}
//this.props.PhotoArr.map()

export default PhotoBox;
