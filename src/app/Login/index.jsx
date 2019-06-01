import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Redirect, Switch, Route } from 'react-router-dom'
// import './style.sass'

import Login from './home'
import NotFound from '../404'

class Index extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Index;