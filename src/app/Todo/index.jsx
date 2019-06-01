import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';

import HomeTodo from './home/index'
import Show from './show/index'
import NotFound from '../404/index'

class Home extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/todo" component={HomeTodo} />
          <Route exact path="/todo/show" component={Show} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Home