/*
сейчас
сделать информациооную базу
создать апи на експерсе для получение данных

позже
реализовать поиск, состоит из двух частей - локальный поиск на странице, который будет идти по сути по текущему уровню то есть по тому что изображено на странице в текущий момент
 и внизу глобальный поиск по всем элементам,  который содержит не более 3 результатов поиски, и обновляется с каждым нажатием кнопки, данные запрашиваются на сервере

потом
*/



import React, { Component } from "react";
import logo from "./logo.svg";
import "./common.css";
import "./header.css";
import "./ticket-table.css";
//https://habr.com/company/devexpress/blog/283314/
import "./App.css";
//let array =[];
let array = [
  {
    name: "обжимка",
    img: "",
    text: "",
    date: "10.11.2017",
    count: 1
  },
  {
    name: "гвозди",
    img: "",
    text: "",
    date: "3.12.2017",
    count: 1
  },
  {
    name: "молоток",
    img: "",
    text: "",
    date: "4.12.2017",
    count: 0
  }

];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div class="ticket-table-wrapper">
            <table id="ticket-table">
              <thead>
                <tr>
                  <th />
                  <th>Фото</th>
                  <th>Название</th>
                  <th>количество</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {array.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <label class="checkbox">
                        <input type="checkbox" />
                        <div class="checkbox__text" />
                      </label>
                    </td>
                    <td>
                      <img src="noimg_m.jpg" />
                    </td>
                    <td>
                      <span> {item.name}</span>
                    </td>
                    <td>{item.count}</td>
                    <td> {item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </p>
      </div>
    );
  }
}

export default App;
