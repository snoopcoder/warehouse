import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import moment from "moment";

import "./ItemCard.css";
import CountArea from "./components/CountArea";
import CommenArea from "./components/CommenArea";
import EditItemName from "./components/EditItemName";
import EditCountArea from "./components/EditCountArea";
import EditComment from "./components/EditComment";
import PhotoBox from "./components/PhotoBox";
import ItemCardHoc from "../hoc/ItemCardHoc.js";

class ItemCard extends Component {
  state = {
    SaveDiasabled: true
  };

  render() {
    return (
      <div className="col-xl-10 col-lg-11 col-md-12 ">
        <div id="itemcard">
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
                        this.props.Items.name
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
                    <div className="infotext">
                      {moment(this.props.Items.date_created).format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Изменен</div>
                    <div className="infotext">
                      {" "}
                      {moment(this.props.Items.date_changed).format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                  </div>
                </span>
                <span className="table-row">
                  <div className="infocell">
                    <div className="infocaption">Последнее перемещение</div>
                    <div className="infotext">
                      {moment(this.props.Items.date_moved).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </span>
                <span className="table-row purchase">
                  <div className="infocaption">Комментарий</div>
                  <div className="infotext">
                    {this.props.EditMode ? (
                      <EditComment {...this.props} />
                    ) : (
                      <CommenArea {...this.props} />
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div id="itemphoto" className=" d-none d-sm-block">
            <PhotoBox {...this.props} />
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Button
            onClick={this.props.changeHandler}
            disabled={!this.props.EditMode || !this.props.nameValid}
            outline
            color="info"
            style={{ width: "100px" }}
          >
            Сохранить
          </Button>{" "}
          {/* <Link to={"/box/" + this.props.Items.parentId + "/show"}>
            <Button outline color="info" style={{ width: "100px" }}>
              Закрыть
            </Button>
          </Link> */}
          <Button
            onClick={() => this.props.changeHandler("close")}
            outline
            color="info"
            style={{ width: "100px" }}
          >
            Закрыть
          </Button>
        </div>
      </div>
    );
  }
}

export default ItemCardHoc(ItemCard);
