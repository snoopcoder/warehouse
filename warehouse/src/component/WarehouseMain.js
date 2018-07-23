import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
//https://habr.com/company/devexpress/blog/283314/
import ContentTable from "./ContentTable.js";
import ParentList from "./ParentList.js";
import Breadcrumbs from "./Breadcrumbs.js";
import ItemCard from "./ItemCard.js";
import NewItemCard from "./NewItemCard.js";
import ImageUpload from "./ImageUpload.js";
import { Button } from "semantic-ui-react";
import update from "immutability-helper";
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

  //проверить коробка это или нет
  // вывести содержимое если это коробка

  //определить три раскладки
  //1 рутовые помещения, со списком заканчивающихся вещей(последняя очередь)
  //2 раскладка для коробки
  //3 раскладка для конкретнгого айтема
  //

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
  nextItem = value => {
    this.setState({ name: value });
  };

  updateData = value => {
    this.setState({ name: value });
  };

  getData = url => {
    return fetch(url)
      .then(response => response.json())
      .catch(function(e) {
        console.log(e);
      });
  };
  // asyncLoadData = async id => {
  //   let JSONcur = await this.getData(
  //     "http://127.0.0.1:3001/content/" + id //this.props.match.params.id
  //   );
  //   //let Now = moment();
  //   //let DataTime = moment(JSONcur.rigs[0].ondate);
  //   //let SecDiffdate = Now.diff(DataTime, "seconds");
  //   this.setState({
  //     Items: JSONcur
  //   });
  // };

  /*

        this.state.Items.breadcrumbs.push({
        BOX: this.props.match.params.id,
        name: this.state.Items.name
      });



      //проверим breadscram
    if (
      this.state.Items &&
      this.state.Items.breadcrumbs &&
      this.state.Items.breadcrumbs.length > 0
    ) {
      if (
        this.props.match.params.id ==
        this.state.Items.breadcrumbs[this.state.Items.breadcrumbs.length - 1]
          .BOX
      ) {
        let Arr = this.state.Items.breadcrumbs;
        Arr.pop();

        const Items = update(this.state.Items, { breadcrumbs: { $set: Arr } });
        this.setState({ Items });
      }
    }
     */

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");

    let _Do = prevState.prevDo;
    if (!prevState.hasOwnProperty("prevDo")) {
      _Do = "show";
    }

    //определить что сейчас происходит переход и нужень контроль breadscrambs
    //скоректировать bredscrambs если нужно
    if (
      prevState.hasOwnProperty("prevDo") &&
      prevState.prevDo === "show" &&
      nextProps.match.params.do === "new"
    ) {
      // происходит смена режима работы с show на add
      _Do = "new";
      // Нужна корректировка breadscrambs если ее еще не было
      let Arr = prevState.Items;
      if (
        prevState.Items.breadcrumbs.length === 0 ||
        prevState.Items.breadcrumbs[prevState.Items.breadcrumbs.length - 1]
          .id !== nextProps.match.params.id
      ) {
        Arr.breadcrumbs.push({
          BOX: nextProps.match.params.id,
          name: Arr.name
        });
      }

      //Ниже есть обработка смены id если она произошла то пойдем к ней
      if (nextProps.match.params.id === prevState.prevId) {
        return {
          Items: Arr,
          prevDo: _Do,
          nameValid: true
        };
      }
    }
    if (
      prevState.hasOwnProperty("prevDo") &&
      prevState.prevDo === "new" &&
      nextProps.match.params.hasOwnProperty("do") === false
    ) {
      // происходит смена режима работы с new на show
      // Нужна корректировка breadscrambs если ее еще не было

      let Arr = prevState.Items;
      if (
        prevState.Items.breadcrumbs.length !== 0 ||
        prevState.Items.breadcrumbs[prevState.Items.breadcrumbs.length - 1]
          .id === nextProps.match.params.id
      ) {
        Arr.breadcrumbs.pop();
      }
      _Do = "show";
      //Ниже есть обработка смены id если она произошла то пойдем к ней
      if (nextProps.match.params.id === prevState.prevId) {
        return {
          prevDo: _Do
        };
      }
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

  // render() {
  //   if (this.state.Items === null) {
  //     // Render loading state ...
  //     return <div>loading</div>;
  //   } else {
  //     // Render real UI ...
  //     return (
  //       <div>
  //         <div>{this.props.match.params.id}</div>
  //         <ContentTable Items={this.state.Items} />
  //       </div>
  //     );
  //   }
  // }

  render() {
    let main = null;
    //условный рендеринг
    if (this.state.Items === null) {
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
    } else if (this.state.Items.content.length == 0) {
      //карточка предмета
      main = (
        <div>
          <Breadcrumbs
            Items={this.state.Items.breadcrumbs}
            Name={this.state.Items.name}
          />
          <ItemCard Items={this.state.Items.content} />
        </div>
      );
    } else if (
      !(this.props.match.params.do === undefined) &&
      this.props.match.params.do == "new"
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
            nameValid={this.state.nameValid}
            parentId={this.props.match.params.id}
          />
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
    if (id == 0) {
      fetch("http://127.0.0.1:3001/root")
        .then(response => response.json())
        .then(JSONcur => {
          this.setState({
            Items: JSONcur
          });
        })
        .catch(function(reason) {
          console.log(reason);
          // отказ
        });
    } else {
      fetch("http://127.0.0.1:3001/item/" + id)
        .then(itemDataStream => itemDataStream.json())
        .then(itemData => {
          this.setState({
            Items: itemData
          });
        })
        .catch(function(reason) {
          console.log(reason);
          // отказ
        });

      // let contentPromis = fetch("http://127.0.0.1:3001/content/" + id);
      // let breadcrumbsPromis = fetch("http://127.0.0.1:3001/breadcrumbs/" + id);
      /*
        определить 
        имя 
        тип
        */
      // Promise.all([contentPromis, breadcrumbsPromis])
      //   .then(data => {
      //     let contentPromis = data[0].json();
      //     let breadcrumbsPromis = data[1].json();
      //     return Promise.all([contentPromis, breadcrumbsPromis]);
      //   })
      //   .then(data => {
      //     this.setState({
      //       Items: data[0],
      //       BreadcrumbsItems: data[1]
      //     });
      //   });
    }
  }
}

export default WarehouseMain;
