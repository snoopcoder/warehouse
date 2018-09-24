import React from "react";
import _ from "lodash";
import axios from "axios";

function PhotoBoxHoc(Component, apiUrl) {
  class PhotoBoxHocClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
    }

    /*

    item_img_RAW {cur_file_name:{blob,
      load_status},
      ...}

    воркер получает данные от инпута с одной или несколькими картинками, создает для них блобы, далее добавляет их в структуру item_img_RAW
    и передает ее выше. по мере загрузки обновляет item_img_RAW и передает ее выше, когда загрузка закончена, для возможности сразу удалить ее крестиком
    тут же в форме нового элемента, заполняется поле item_img_RAW с именем ImgNameOnServer. компонент ItemViewer перестает отображеть прогресс бар и русет крестик,
    через который мы должно иметь возможно удалить картинку.
    а компонент будет отображатеть два набора картинок item_img и item_img_RAW таким образом новые картинки будут всегда в конце вне зависимости
    от имени что будет удобно чтоб их отделить визуально
    воркер загрузчик картинок
    Этот воркер получает даныые о картинках, выбирает картинку заглушку(на время даунлода) и начинает грузить    
    перед этим  выставляет статус загрузки и начинает качать картинки(можно по очереди можно паралельно, надо подумать)
    по мере загрузки обновляет статус загрузки, а по ее окончании меняет картинку заглушку на нужную
    при аплоаде воркер берет блоб открытой картинки и ставляет ее в модель и не использует заглушку    
    */

    /*воркер дроппер
    этот воркер для удалаение картинок, получает имя картинки и удлает ее из модели и с сервера
    */

    componentDidMount() {}

    //получить информацио о выбраных файлах от компонента

    ImageProssing = files => {
      //ToDo подумать над случаем кошгда добавляются одинаковые фотографии
      for (let file of files) {
        this.ImageLoad(file);
      }
    };

    FillModel = (cur_file_name, blob, load_status, ImgNameOnServer) => {
      let item_img_RAW = _.cloneDeep(this.props.item_img_RAW);
      if (!item_img_RAW[cur_file_name]) item_img_RAW[cur_file_name] = {};

      item_img_RAW[cur_file_name].blob = blob;
      item_img_RAW[cur_file_name].load_status = load_status;
      if (ImgNameOnServer)
        item_img_RAW[cur_file_name].ImgNameOnServer = ImgNameOnServer;
      //this.props.inputHandler("changeComment", e.target.value);
      this.props.inputHandler("changeImg", item_img_RAW);
    };

    ImageLoad = file => {
      let reader = new FileReader();

      // let file = e.target.files[0];
      // //Это мой костыльный эвент. так как оригинал передавать нельзя, браузел его обнуляет
      // let event = {};
      // event.target = {};
      // event.target.value = file;

      reader.onloadend = () => {
        //ImageReadyFunc(file, reader.result, 0);
        this.FillModel(file.name, reader.result, 0);
        const data = new FormData();
        data.append("myFile", reader.result, "logo.jpg");
        // data.append("nameInput", obj.nameInput);
        // data.append("countInput", obj.countInput);
        // data.append("TextAreaInput", obj.TextAreaInput);
        // data.append("parentId", obj.parentId);

        let config = {
          onUploadProgress: progressEvent => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (percentCompleted === 100) percentCompleted = 99;
            this.FillModel(file.name, reader.result, percentCompleted);
          }
        };

        axios
          .put("http://127.0.0.1:3001/image", data, config)
          .then(
            response => response.json() // if the response is a JSON object
          )
          .then(ImgNameOnServer => {
            this.FillModel(file.name, reader.result, 100);
            console.log(ImgNameOnServer); // Handle the success response object
            return ImgNameOnServer;
          })
          .catch(error => {
            console.log(error); // Handle the error response object
          })
          .then(ImgNameOnServer => {
            this.FillModel(file.name, reader.result, 100, ImgNameOnServer);
          });
      };
      reader.readAsDataURL(file);
    };

    render() {
      return <Component ImageProssing={this.ImageProssing} {...this.props} />;
    }
  }

  PhotoBoxHocClass.displayName = `PhotoBoxHocClass(${Component.displayName ||
    Component.name ||
    "Component"})`;

  return PhotoBoxHocClass;
}

export default PhotoBoxHoc;
