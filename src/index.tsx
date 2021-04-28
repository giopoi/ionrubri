import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './users'
import Notfound from './notfound'
import { Route, Link, BrowserRouter as Router, Switch, match } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users/:id" component={Users} />
        {/*<Route component={Notfound} />*/}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing/* <App /> */, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
