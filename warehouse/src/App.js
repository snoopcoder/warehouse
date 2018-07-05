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
//https://habr.com/company/devexpress/blog/283314/
import "./App.css";
import ContentTable from "./component/ContentTable.js";
import ParentList from "./component/ParentList.js";
import Breadcrumbs from "./component/Breadcrumbs.js";

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
  state = {
    ItemsArr: { rigs: [] },
    DataOld: 0
  };

  //проверить коробка это или нет
  // вывести содержимое если это коробка

  //определить три раскладки
  //1 рутовые помещения, со списком заканчивающихся вещей(последняя очередь)
  //2 раскладка для коробки
  //3 раскладка для конкретнгого айтема
  //

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
  asyncLoadData = async id => {
    let JSONcur = await this.getData(
      "http://127.0.0.1:3001/content/" + id //this.props.match.params.id
    );
    //let Now = moment();
    //let DataTime = moment(JSONcur.rigs[0].ondate);
    //let SecDiffdate = Now.diff(DataTime, "seconds");
    this.setState({
      Items: JSONcur
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    //console.log(nextProps);

    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (nextProps.match.params.id !== prevState.prevId) {
      console.log(
        "getDerivedStateFromProps get change props",
        nextProps.match.params.id
      );
      return {
        Items: null,
        prevId: nextProps.match.params.id
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
    if (this.state.Items === null) {
      main = <div>loading</div>;
    } else if (this.props.match.params.id == 0) {
      main = <ParentList Items={this.state.Items} />;
    } else {
      main = (
        <div>
          <div>{this.props.match.params.id}</div>
          <ContentTable Items={this.state.Items} />
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
      fetch("http://127.0.0.1:3001/content/" + id)
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
    }

    /*
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        const person = data.results[0];
        this.setState({ name: `${person.name.first} ${person.name.last}` })
      })*/

    // this._asyncRequest = asyncLoadData(id).then(externalData => {
    //   this._asyncRequest = null;
    //   this.setState({ externalData });
    // });
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
          <Link to="/box/10">Коробка 1 (id=10)</Link>
        </li>
        <li>
          <Link to="/box/6">Камера 6 (id=6)</Link>
        </li>
        <li>
          <Link to="/box/0">root</Link>
        </li>
      </ul>
    </nav>
  </header>
);
