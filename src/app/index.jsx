import React from 'react'
import { Switch, Route, Link, withRouter, BrowserRouter } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import logo from '../assets/img/logoMain.png'

import Todo from './Todo'
import Login from './Login'
import User from './user'
import NotFound from './404'

class Header extends React.Component {

  componentDidMount() {
    console.log('asd')
  }

  render() {
    return (
      <div>
        <div className="content-menu">
          <div className="menu">
            <div><Link to="/todo">Home</Link></div>
            <div><Link to="/user">Alumnos</Link></div>
            <div>Otros</div>
          </div>
          <div className="logo">
            <Image src={logo} />
          </div>
        </div>

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