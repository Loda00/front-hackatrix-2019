import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CreateUser from './create'
import HomeUser from './home'
import NotFound from '../404'

class User extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/user"
            component={HomeUser}
          />
          <Route
            exact
            path="/user/create"
            component={CreateUser}
          />
          <Route
            exact
            path="/user/edit/:id"
            component={CreateUser}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

export default User