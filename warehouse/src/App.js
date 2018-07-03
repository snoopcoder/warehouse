/*
сейчас
сделать информациооную базу
создать апи на експерсе для получение данных

позже
реализовать поиск, состоит из двух частей - локальный поиск на странице, который будет идти по сути по текущему уровню то есть по тому что изображено на странице в текущий момент
 и внизу глобальный поиск по всем элементам,  который содержит не более 3 результатов поиски, и обновляется с каждым нажатием кнопки, данные запрашиваются на сервере

потом
*/
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
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
        <div>
          <Header />
          <Main />
        </div>
      </div>
    );
  }
}

class BOX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
    console.log("print");
    console.log(this.props);
  }
  test() {}
  render() {
    return (
      <div className="ticket-table-wrapper">
        <div>{this.test()}</div>
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
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="checkbox__text" />
                  </label>
                </td>
                <td>
                  <img src="/noimg_m.jpg" />
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
    );
  }
}

export default App;

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() {
    return this.players;
  },
  get: function(id) {
    const isPlayer = p => p.number === id;
    return this.players.find(isPlayer);
  }
};

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
  <div>
    <ul>
      {PlayerAPI.all().map(p => (
        <li key={p.number}>
          <Link to={`/roster/${p.number}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = props => {
  const player = PlayerAPI.get(parseInt(props.match.params.number, 10));
  if (!player) {
    return <div>Sorry, but the player was not found</div>;
  }
  return (
    <div>
      <h1>
        {player.name} (#{player.number})
      </h1>
      <h2>Position: {player.position}</h2>
      <Link to="/roster">Back</Link>
    </div>
  );
};

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
  <Switch>
    <Route exact path="/roster" component={FullRoster} />
    <Route path="/roster/:number" component={Player} />
  </Switch>
);

const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
);

const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
);

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/roster" component={Roster} />
      <Route path="/box/:id" component={BOX} />
    </Switch>
  </main>
);

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/roster">Roster</Link>
        </li>
        <li>
          <Link to="/box/1">BOX</Link>
        </li>
      </ul>
    </nav>
  </header>
);
