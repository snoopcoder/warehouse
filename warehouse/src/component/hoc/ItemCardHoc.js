import React from "react";

function ItemCardHoc(Component, apiUrl) {
  class ItemCardHocClass extends React.Component {
    state = {
      changeObj: {}
    };

    componentDidMount() {}

    inputHandler = (inputName, value, SubmitNow) => {
      // третий параметр используется елси поле ввода само вызывает функцию сабмита, для случаев кога на форме меняется только одно значение
      let changeObj = this.state.changeObj;

      switch (inputName) {
        case "changeName": {
          changeObj.changeName = value;
          break;
        }
        case "changeCountType": {
          changeObj.changeCountType = value;
          break;
        }
        case "changeComment": {
          changeObj.changeComment = value;
          break;
        }
        case "changeManyCount": {
          changeObj.changeManyCount = value;
          break;
        }
        case "changeMachCount": {
          changeObj.changeMachCount = value;
          break;
        }
      }
      if (SubmitNow) {
        this.setState(
          {
            changeObj
          },
          this.changeHandler()
        );
      } else {
        this.setState({
          changeObj
        });
      }
    };

    /**  EditMode={this.state.mode === "edit" ? true : false}
            Items={this.state.Items}
            handleSubmit={this.handleSubmit}
            checkName={this.checkName}*/

    changeHandler = () => {
      let Items = this.props.Items;
      let changeObj = this.state.changeObj;
      for (let change in changeObj) {
        switch (change) {
          case "changeName": {
            console.log(change, changeObj[change]);
            Items.name = changeObj.changeName;
            break;
          }
          case "changeCountType": {
            console.log(change, changeObj[change]);
            Items.count_type = changeObj.changeCountType;
            break;
          }
          case "changeComment": {
            console.log(change, changeObj[change]);
            Items.comment = changeObj.changeComment;
            break;
          }
          case "changeManyCount": {
            console.log(change, changeObj[change]);
            Items.count_many = changeObj.changeManyCount;
            break;
          }
          case "changeMachCount": {
            console.log(change, changeObj[change]);
            Items.count_mach = changeObj.changeMachCount;
            break;
          }
        }
      }
      this.props.handleSubmit(Items);
      this.setState({ changeObj: {} });
    };

    render() {
      return (
        <Component
          changeHandler={this.changeHandler}
          inputHandler={this.inputHandler}
          {...this.props}
        />
      );
    }
  }

  ItemCardHocClass.displayName = `ItemCardHocClass(${Component.displayName ||
    Component.name ||
    "Component"})`;

  return ItemCardHocClass;
}

export default ItemCardHoc;
