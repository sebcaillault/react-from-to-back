import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";

const App = () => {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {

    setAlert({ message, type });
    setTimeout(() => { setAlert(null) }, 4000);

  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div className="container">
            <Alert alert={alert} />

            <Switch>

              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={showAlert} />
                  <Users />
                </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />

            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );

}

export default App;
