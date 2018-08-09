import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import React, { Component } from "react";
//https://habr.com/company/devexpress/blog/283314/
import ContentTable from "./ContentTable.js";
import ParentList from "./ParentList.js";
import Breadcrumbs from "./Breadcrumbs.js";
import ItemCard from "./ItemCard.js";
import NewItemCard from "./NewItemCard.js";
import ImageUpload from "./ImageUpload.js";
import { Button } from "@material-ui/core";
import update from "immutability-helper";
import Loadable from "react-loading-overlay";
import axios from "axios";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

function isNumber(obj) {
  return !isNaN(parseFloat(obj));
}

class WarehouseMain extends Component {
  state = {
    ItemsArr: { rigs: [] },
    DataOld: 0,
    nameValid: true
  };

  /*
  
      items: {
      id: "",
      type: "",
      name: "",
      date: "",
      count: "",
      breadcrumbs: "",
      imgUrl: "/noimg_m.jpg",
      content: ""
    }
  */
  //проверить коробка это или нет
  // вывести содержимое если это коробка

  //определить три раскладки
  //1 рутовые помещения, со списком заканчивающихся вещей(последняя очередь)
  //2 раскладка для коробки
  //3 раскладка для конкретнгого айтема
  //

  /* Рефакторинг
1 +перенос раздачу картинок на сторону коа
2 переписать getDerivedStateFromProps  
3 создать модель данных
4 переделать создание и изменение
5 переделать корректировку крошек*/

  handleSubmit = async obj => {
    ///console.log(this.state.nameInput);

    const data = new FormData();
    if (obj.myFile !== "") data.append("myFile", obj.myFile, "logo.jpg");
    data.append("nameInput", obj.nameInput);
    data.append("countInput", obj.countInput);
    data.append("TextAreaInput", obj.TextAreaInput);
    data.append("parentId", obj.parentId);

    // fetch("http://127.0.0.1:3001/item", {
    //   method: "POST",
    //   body: data
    // })
    //   .then(
    //     response => response.json() // if the response is a JSON object
    //   )
    //   .then(success => {
    //     console.log(success); // Handle the success response object
    //     this.props.history.push("/box/" + this.props.match.params.id + "/show");
    //   })
    //   .catch(error => {
    //     console.log(error); // Handle the error response object
    //     this.props.history.push("/box/" + this.props.match.params.id + "/show");
    //   });
  };

  IsNameBusy = name => {
    let promis = new Promise(function(resolve, reject) {
      fetch("http://127.0.0.1:3001/item/" + name)
        .then(itemDataStream => itemDataStream.json())
        .then(itemData => {
          if (itemData.id == "") {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(function(reason) {
          console.log(reason);
          reject(false);
          // отказ
        });
    });
    return promis;
  };

  checkName = async name => {
    if (name.length < 3) {
      //слишком короткое имя
      this.setState({ nameValid: false });
    } else if (isNumber(name)) {
      //имя это число. так не пойдет
      this.setState({ nameValid: false });
    } else if (await this.IsNameBusy(name)) {
      this.setState({ nameValid: false });
    } else {
      this.setState({ nameValid: true });
    }
  };

  componentWillUnmount() {
    console.log("unmounting");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "getDerivedStateFromProps,",
      nextProps.history.action,
      nextProps.history.location.pathname
    );

    let _Do = "show";
    if (prevState.hasOwnProperty("prevDo")) {
      _Do = prevState.prevDo;
    }

    //определить что сейчас происходит
    if (
      prevState.hasOwnProperty("prevDo") &&
      prevState.prevDo === "show" &&
      nextProps.match.params.do === "new"
    ) {
      // происходит смена режима работы с show на new
      _Do = "new";
      return {
        //Items: Arr,
        prevDo: _Do,
        //чтобы первоначальная закраска инпута не была красной
        nameValid: true,
        //запросим новые данные
        Items: null
      };
    }
    if (
      prevState.hasOwnProperty("prevDo") &&
      prevState.prevDo === "new" &&
      nextProps.match.params.do === "show"
    ) {
      // происходит смена режима работы с new на show
      _Do = "show";
      return {
        prevDo: _Do,
        //запросим новые данные
        Items: null
      };
    }

    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (nextProps.match.params.id !== prevState.prevId) {
      console.log(
        "getDerivedStateFromProps get change props",
        nextProps.match.params.id
      );
      return {
        Items: null,
        prevId: nextProps.match.params.id,
        prevDo: _Do,
        nameValid: true
      };
    }
    // No state update necessary
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.id);
    this._loadAsyncData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.Items === null) {
      console.log("componentDidUpdate", this.props.match.params.id);
      this._loadAsyncData(this.props.match.params.id);
    }
  }

  render() {
    let main = null;
    //условный рендеринг
    if (!this.state.Items) {
      //не загружены данные отображаем калач
      main = <div>loading</div>;
    } else if (this.props.match.params.id == 0) {
      //это рут
      main = (
        <div>
          <Breadcrumbs />
          <ParentList Items={this.state.Items} />
        </div>
      );
    } else if (
      !(this.props.match.params.do === undefined) &&
      this.props.match.params.do === "new"
    ) {
      //Новый предмет
      main = (
        <div>
          <Breadcrumbs
            Items={this.state.Items.breadcrumbs}
            Name={"Новый предмет"}
          />
          <NewItemCard
            checkName={this.checkName}
            handleSubmit={this.handleSubmit}
            nameValid={this.state.nameValid}
            parentId={this.props.match.params.id}
          />
        </div>
      );
    } else if (this.state.Items.content.length == 0) {
      //карточка предмета
      main = (
        <div>
          <Breadcrumbs
            Items={this.state.Items.breadcrumbs}
            Name={this.state.Items.name}
          />
          <ItemCard Items={this.state.Items} />
        </div>
      );
    } else {
      //разметка для коробки
      main = (
        <div>
          <Breadcrumbs
            Items={this.state.Items.breadcrumbs}
            Name={this.state.Items.name}
          />
          <Link to={"/box/" + this.state.Items.id + "/new"}>
            <Button>New</Button>
          </Link>
          <ContentTable Items={this.state.Items.content} />
        </div>
      );
    }

    return (
      <div className="WareHousePage">
        <div className="WareHouseLeft" />
        <div className="WareHouseMain"> {main}</div>
      </div>
    );
  }

  _loadAsyncData(id) {
    let url = "";
    if (id === "0") url = "http://127.0.0.1:3001/root";
    else url = "http://127.0.0.1:3001/item/" + id;

    fetch(url)
      .then(itemDataStream => itemDataStream.json())
      .then(itemData => {
        this._FillModel(itemData);
      })
      .catch(function(reason) {
        console.log(reason);
        // отказ
      });
  }
  _FillModel(itemData) {
    if (this.state.prevDo === "new") {
      let item = {
        id: "undefined",
        type: "",
        name: "Новый предмет",
        date: "",
        count: "",
        breadcrumbs: "",
        imgUrl: "/noimg_m.jpg",
        content: ""
      }; //{BOX: 10, name: "коробка 1"}
      let breadcrumbs = itemData.breadcrumbs;
      breadcrumbs.push({ BOX: itemData.id, name: itemData.name });
      item.breadcrumbs = breadcrumbs;
      itemData = item;
    }
    this.setState({
      Items: itemData
    });
  }
}

export default withRouter(WarehouseMain);
