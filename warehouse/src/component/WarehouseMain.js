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
import ItemCardOld from "./ItemCardOld.js";
import ItemCard from "./ItemCard";
import NewItemCard from "./NewItemCard.js";
import ImageUpload from "./ImageUpload.js";
// import ToolBox from "./ToolBox.js";
import { Button } from "@material-ui/core";
import update from "immutability-helper";
import Loadable from "react-loading-overlay";
import Baron from "react-baron/dist/es5";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPlus,
  faExchangeAlt,
  faEdit,
  faBars
} from "@fortawesome/free-solid-svg-icons";

import MyButton from "./MyButton";
import SidePanel from "./SidePanel";

import "./WarehouseMain.css";

function isNumber(obj) {
  return !isNaN(parseFloat(obj));
}

library.add(faTrashAlt, faPlus, faExchangeAlt, faEdit, faBars);

class WarehouseMain extends Component {
  state = {
    ItemsArr: { rigs: [] },
    DataOld: 0,
    mode: "normal",
    ToolBoxButton: {
      Add: true,
      Edit: true,
      DeleteForever: true,
      Save: true,
      SwapHoriz: true,
      NotInterested: true
    },
    panelNow: {
      add: false,
      move: false,
      edit: false,
      del: false
    }
  };

  /*
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

  ToolBoxButtonHelper = (name, value) => {
    /*let ToolBoxButton={
    Add : true,
    Edit: true,
    DeleteForever: true,
    Save: true,
    SwapHoriz: true,
    NotInterested: true

  }*/
    let ToolBoxButton = this.state.ToolBoxButton;
    ToolBoxButton[name] = value;
    // this.setState({
    //   ToolBoxButton: ToolBoxButton
    // });
  };

  handleList = id => {};

  handleToolBox = name => {
    switch (name) {
      case "MarkupListEdit": {
        if (this.state.mode === "normal") {
          this.setState({
            mode: "edit"
          });
        } else if (this.state.mode === "edit") {
          this.setState({
            mode: "normal"
          });
        }
        break;
      }
      case "MarkupListAdd": {
        this.props.history.push("/box/" + this.props.match.params.id + "/new");
        break;
      }
      case "MarkupNewNotInterested": {
        this.props.history.push("/box/" + this.props.match.params.id + "/show");
        break;
      }
      //
      case "MarkupNewSave": {
        this.setState({
          mode: "save"
        });
        break;
      }
      default:
        break;
    }
  };

  handleSidePanel = Do => {
    switch (Do) {
      case "add": {
        this.setState(
          {
            mode: "edit"
          },
          () => {
            this.props.history.push(
              "/box/" + this.props.match.params.id + "/new"
            );
          }
        );

        break;
      }
      case "edit": {
        this.setState({
          mode: "edit"
        });
        break;
      }
    }
    console.log(Do);
  };

  saveData = async Items => {
    let method = Items.id === "" ? "post" : "put";
    fetch("http://127.0.0.1:3001/item", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Items)
    })
      .then(response => {
        return response.json();
      }) //после запроса на отправку данных, и при put и при post мы получим обратно Id предмета
      .then(create => {
        //и после успешного добавления данных в базе мы можем сразе запросить свежие данные, в
        console.log("Update:", create.id); //которых например будут обновлены даты перемещения изменения. и нет разницы что для нового
        this._loadAsyncData(create.id); //что для уже существующего
        this.props.history.push("/box/" + create.id + "/show");
      })
      .catch(e => {
        console.log(e);
        //Ошибка, возвращаеся к родителю
        //ToDo показать попап об ошибке
        this.props.history.push("/box/" + Items.parentId + "/show");
      });
  };

  handleSubmit = async Items => {
    if (Items) {
      console.log(Items);
      //очистим специальные режимы и сразу отобразим изменения не дожидась их сохранения на сервере
      //когда сервер примет измениния ответит что все, страница загружит данные и снова обновить страницу
      //если все хорошо обновятся только ссотвестующие даты обновлений, если возникнет ошибка то данные вернутся к \
      //своим старым значениям, возможно тогда будет уместным изобразить попап с информацией об ошибке сохранения
      this.setState({
        mode: "show",
        Items: Items
      });
      //сравнить данные старые и новыие если неоюходимо то синхронизировать их
      if (!_.isEqual(this.state.Items, Items)) {
        await this.saveData(Items);
      }
    } else {
      this.setState({
        mode: "normal"
      });
      this.props.history.push("/box/" + this.state.Items.parentId + "/show"); //this.props.Items.parentId + "/show"
    }

    /*
ToDo
картинки будут загружаться во время редактирования предмета. пока картинки не загрузятся нелья нажать сохранить
картинки загружаеются, их имена вносятся в таблицу ImgTemp (для обработки случаев если предмет так и не будет созадан и картинки станут мусором)
ImgTemp очищается по расписанию, при этом удаляются все картинки, которые находятся в ImgTemp но добавлены более часа назад.
по мере загруки картинок, от сервера возращаются их имена на сервере, эта инфа вносится через пробел в поле logo в json который будет отправлен на сервер 
в базе все пренадлелжащие предмету картинки перечислены через пробел в поле logo
при сохранении предмета, имена удаляются из ImgTemp
если вносятся корректировки в logo базе, код просматривает какие картинки теперь отсутвуют, и вносит их в ImgTemp, и поэтому через час они будут удалены
*/

    // const data = new FormData();
    // if (obj.myFile !== "") data.append("myFile", obj.myFile, "logo.jpg");
    // data.append("nameInput", obj.nameInput);
    // data.append("countInput", obj.countInput);
    // data.append("TextAreaInput", obj.TextAreaInput);
    // data.append("parentId", obj.parentId);

    // fetch("http://127.0.0.1:3001/item", {
    //   method: "POST",
    //   body: data
    // })
    //   .then(
    //     response => response.json() // if the response is a JSON object
    //   )
    //   .then(success => {
    //     console.log(success); // Handle the success response object
    //   })
    //   .catch(error => {
    //     console.log(error); // Handle the error response object
    //   })
    //   .then(() => {
    //     this.setState({
    //       mode: "show"
    //     });
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
    console.log("name");
    if (name === "Новый предмет") {
      this.setState({ nameValid: false });
    } else if (name === this.state.Items.name) {
      this.setState({ nameValid: true });
    } else if (name.length < 3) {
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
    //изза случаая когда в url опущен  параметр DO коректировка
    let doNow = nextProps.match.params.do ? nextProps.match.params.do : "show";
    //корректировка если рут
    if (nextProps.match.params.id === "0") doNow = "showRoot";

    //определить что сейчас происходит
    if (
      prevState.hasOwnProperty("prevDo") &&
      prevState.prevDo === "show" &&
      nextProps.match.params.do === "new"
    ) {
      // происходит смена режима работы с show на new
      _Do = "new";
      return {
        prevDo: _Do,
        nameValid: true,
        //запросим новые данные
        DataIsActual: null,
        panelNow: changePanel(doNow)
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
        DataIsActual: null,
        panelNow: changePanel(doNow)
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
        DataIsActual: null,
        prevId: nextProps.match.params.id,
        prevDo: _Do,
        nameValid: true,
        panelNow: changePanel(doNow)
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
    if (this.state.DataIsActual === null) {
      console.log("componentDidUpdate", this.props.match.params.id);
      this._loadAsyncData(this.props.match.params.id);
    }
  }

  render() {
    let main = null;
    let breadcrumb = null;
    //условный рендеринг
    if (!this.state.DataIsActual) {
      //не загружены данные отображаем калач
      breadcrumb = <Breadcrumbs updateDisabled={true} />;
      main = <div>loading</div>;
    } else if (this.props.match.params.id == 0) {
      //это рут
      breadcrumb = <Breadcrumbs />;
      main = (
        <div>
          <ParentList Items={this.state.Items} />
        </div>
      );
    } else if (
      !(this.props.match.params.do === undefined) &&
      this.props.match.params.do === "new"
    ) {
      //Новый предмет
      breadcrumb = (
        <Breadcrumbs
          Items={this.state.Items.breadcrumbs}
          Name={"Новый предмет"}
        />
      );
      main = (
        <div>
          {/* <ToolBox
            do="new"
            handleToolBox={this.handleToolBox}
            mode={this.state.mode}
            nameValid={this.state.nameValid}
          /> */}
          {/* <NewItemCard
            checkName={this.checkName}
            handleSubmit={this.handleSubmit}
            nameValid={this.state.nameValid}
            parentId={this.props.match.params.id}
            mode={this.state.mode}
          /> */}
          <ItemCard
            EditMode={this.state.mode === "edit" ? true : false}
            Items={this.state.Items}
            handleSubmit={this.handleSubmit}
            checkName={this.checkName}
            nameValid={this.state.nameValid}
            checkName={this.checkName}
          />
        </div>
      );
    } else if (this.state.Items.content.length == 0) {
      //карточка предмета
      breadcrumb = (
        <Breadcrumbs
          Items={this.state.Items.breadcrumbs}
          Name={this.state.Items.name}
        />
      );
      main = (
        <div>
          {/* <ToolBox do="item" /> */}
          {/**/}
          <ItemCard
            EditMode={this.state.mode === "edit" ? true : false}
            Items={this.state.Items}
            handleSubmit={this.handleSubmit}
            checkName={this.checkName}
            nameValid={this.state.nameValid}
            checkName={this.checkName}
          />
        </div>
      );
    } else {
      //разметка для коробки
      breadcrumb = (
        <Breadcrumbs
          Items={this.state.Items.breadcrumbs}
          Name={this.state.Items.name}
        />
      );
      main = (
        <div>
          <div className="col-xl-10">
            {/* <ToolBox
              do="list"
              handleToolBox={this.handleToolBox}
              ToolBoxButton={this.ToolBoxButton}
              mode={this.state.mode}
            /> */}
          </div>
          <ContentTable
            Items={this.state.Items.content}
            mode={this.state.mode}
          />
        </div>
      );
    }

    return (
      <div id="wrapper">
        <div id="sidebar">
          <SidePanel
            panelNow={this.state.panelNow}
            onClick={this.handleSidePanel}
          />
        </div>
        <div id="topbox" className="WareHouseLeft">
          {breadcrumb}
        </div>
        <div id="content" className="WareHouseMain">
          <Baron>{main}</Baron>
        </div>
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
        id: "",
        name: "Новый предмет",
        parentId: itemData.id,
        comment: "",
        date_created: moment(),
        date_changed: moment(),
        date_moved: moment(),
        breadcrumbs: "",
        item_img: "noimg.jpg",
        count_type: "many",
        count_mach: "много",
        count_many: "1"
      }; //{BOX: 10, name: "коробка 1"}
      //крошки для нового элемента берем от родителя
      let breadcrumbs = itemData.breadcrumbs;
      //кореектируем их добавляя в них самого родителя
      breadcrumbs.push({ BOX: itemData.id, name: itemData.name });
      item.breadcrumbs = breadcrumbs;
      itemData = item;
    }
    this.setState({
      Items: itemData,
      DataIsActual: true
    });
  }
}

export default withRouter(WarehouseMain);

let changePanel = doNow => {
  let panelNow = {
    add: false,
    move: false,
    edit: false,
    del: false
  };
  switch (doNow) {
    case "show": {
      panelNow = {
        add: false,
        move: true,
        edit: false,
        del: false
      };
      break;
    }
    case "showRoot": {
      panelNow = {
        add: true,
        move: true,
        edit: true,
        del: true
      };
      break;
    }
    case "new": {
      panelNow = {
        add: true,
        move: true,
        edit: true,
        del: true
      };
      break;
    }
  }
  return panelNow;
};
