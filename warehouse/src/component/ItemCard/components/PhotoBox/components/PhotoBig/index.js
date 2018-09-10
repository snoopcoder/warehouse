import React, { Component } from "react";
import "./PhotoBig.css";

class PhotoBig extends Component {
  onClick = () => {
    console.log("PhotoBig click");
  };

  render() {
    return (
      //TODO сделать модальный диалог с расширением на весь экран картинки,
      // модалка возможно тоже должна уметь перелистывать
      <div id="PhotoBig-main-div">
        {/* //для варинта с бэкраундом */}

        {/* <div class="img-container-3" /> */}

        <img
          className="img-container-2 "
          src={this.props.img}
          onClick={this.onClick}
        />
      </div>
    );
  }
}
//this.props.PhotoArr.map()
//http://127.0.0.1:3001/public/aba964dd-c4e7-40bf-8c38-7fff9022a95c.jpg
//        <img src="http://127.0.0.1:3001/public/12_original.jpg" />
export default PhotoBig;
