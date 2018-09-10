import React from "react";
import _ from "lodash";

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
          this.props.checkName(value);
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

    changeHandler = Do => {
      if (Do === "close") {
        this.props.handleSubmit(null);
        this.setState({ changeObj: {} });
      } else {
        let Items = _.cloneDeep(this.props.Items);
        let changeObj = this.state.changeObj;
        for (let change in changeObj) {
          switch (change) {
            case "changeName": {
              Items.name = changeObj.changeName;
              break;
            }
            case "changeCountType": {
              Items.count_type = changeObj.changeCountType;
              break;
            }
            case "changeComment": {
              Items.comment = changeObj.changeComment;
              break;
            }
            case "changeManyCount": {
              Items.count_many = changeObj.changeManyCount;
              break;
            }
            case "changeMachCount": {
              Items.count_mach = changeObj.changeMachCount;
              break;
            }
          }
        }
        this.props.handleSubmit(Items);
        this.setState({ changeObj: {} });
      }
    };

    render() {
      console.log(this.props.nameValid);
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
