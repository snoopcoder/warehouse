import React from "react";
import _ from "lodash";

function PhotoBoxHoc(Component, apiUrl) {
  class PhotoBoxHocClass extends React.Component {
    state = {
      changeObj: {}
    };

    componentDidMount() {}

    ImageLoad = (file, ImageReadyFunc) => {
      let reader = new FileReader();

          // let file = e.target.files[0];
    // //Это мой костыльный эвент. так как оригинал передавать нельзя, браузел его обнуляет
    // let event = {};
    // event.target = {};
    // event.target.value = file;
   
    reader.onloadend = () => {
      ImageReadyFunc(file,reader.result,0);
      const data = new FormData();
    if (file!== "") data.append("myFile", reader.result, "logo.jpg");
    // data.append("nameInput", obj.nameInput);
    // data.append("countInput", obj.countInput);
    // data.append("TextAreaInput", obj.TextAreaInput);
    // data.append("parentId", obj.parentId);

    fetch("http://127.0.0.1:3001/image", {
      method: "POST",
      body: data
    })
      .then(
        response => response.json() // if the response is a JSON object
      )
      .then(ImgNameOnServer => {
        ImageReadyFunc(file,reader.result,100)
        console.log(ImgNameOnServer); // Handle the success response object
      })
      .catch(error => {
        console.log(error); // Handle the error response object
      })
      .then(() => {
        this.setState({
          mode: "show"
        });
        this.props.history.push("/box/" + this.props.match.params.id + "/show");
    //   });
      
   
    };
        reader.readAsDataURL(file);
    };

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
