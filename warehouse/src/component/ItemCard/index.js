import React, { Component } from "react";
import "./ItemCard.css";
import CountArea from "./components/CountArea";
import EditItemName from "./components/EditItemName";
import EditCountArea from "./components/EditCountArea";
import EditComment from "./components/EditComment";

class ItemCard extends Component {
  onClick = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="col-xl-10 col-lg-11 col-md-12 ">
        <div id="itemcard">
          <div id="itemphoto" className=" d-none d-sm-block" />
          <div id="itemdata">
            <div id="container">
              <div className="pricing-table">
                <span className="table-row table-head">
                  <div className="infocell">
                    <div className="infocaption">Наименование</div>
                    <div className="infotext">
                      {this.props.EditMode ? (
                        <EditItemName {...this.props} />
                      ) : (
                        "Райзер 6pin тип 1"
                      )}
                    </div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Количество</div>
                    <div className="infotext">
                      {this.props.EditMode ? (
                        <EditCountArea {...this.props} />
                      ) : (
                        <CountArea {...this.props} />
                      )}
                    </div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Добавлен</div>
                    <div className="infotext">15/08/2018</div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Изменен</div>
                    <div className="infotext">01/09/2018</div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Последнее перемещение</div>
                    <div className="infotext">01/09/2018</div>
                  </div>
                </span>
                <span className="table-row purchase">
                  <div className="infocaption">Комментарий</div>
                  <div className="infotext">
                    {" "}
                    {this.props.EditMode ? (
                      <EditComment {...this.props} />
                    ) : (
                      "-"
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;
