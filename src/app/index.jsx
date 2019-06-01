import React from 'react'
import { Switch, Route, Router, withRouter, BrowserRouter } from 'react-router-dom'

import Todo from './Todo'
import Login from './Login'
import User from './user'
import NotFound from './404'

class Header extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/todo"
            component={Todo}
          />
          <Route
            exact
            path="/user"
            component={User}
          />
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </div>
    )
  }
}

export default Header