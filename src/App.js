import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Add from './components/users/Add';
import Show from './components/users/Show';
import List from './components/users/List';

function App() {
  return (
    <Router>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/users" className="navbar-brand">
          BunkerUser
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
            <Route exact path={["/","/users"]} component={List} />
            <Route exact path="/add" component={Add} />
            <Route path="/users/:id" component={Show} />
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
