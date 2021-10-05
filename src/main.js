import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Authorization from './components/authorization/index';
import Registration from './components/registration/index';
import Cabinet from './components/cabinet/index';
import Header from './components/header';
import Rent from './components/rent';
import './main.css';

class Main extends Component {

  render() {

    return (
      <div className="main">
        <Router>
          <Switch>
            <Route path="/authorization">
              <Authorization />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/cabinet">
              <Header />
              <Cabinet />
            </Route>
            <Route path="/rent">
              <Header />
                <Rent />
            </Route>
          </Switch>
         </Router>
      </div>
    );
  }
}

export default Main;
