import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import logo from '../../../assets/img/logo.png'
import jwt from 'jsonwebtoken'
import axios from 'axios'

class Index extends React.Component {
  constructor() {
    super()
    axios.defaults.baseURL = 'http://localhost:3001/'
    // axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    // console.log(`bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`)
  }

  state = {
    user: '',
    userError: false,
    pass: '',
    passError: false,
    errorLogIn: false,
    entry: false,
  }

  handleChangeInput = (e) => {
    e.preventDefault()

    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const { pass, user } = this.state

    this.setState({
      passError: false,
      userError: false,
      errorLogIn: false,
    })

    let isValid = true

    if (isEmpty(pass)) {
      isValid = false
      this.setState({
        passError: true,
      })
    }

    if (isEmpty(user)) {
      isValid = false
      this.setState({
        userError: true,
      })
    }

    const data = {
      id_email: user,
      password: pass,
    }

    if (!isValid) return;

    axios.post('api/login', data)
      .then(res => {
        if (res.data) {
          sessionStorage.setItem('jwt', JSON.stringify(res.data.token));
          this.setState({
            entry: true,
          })
        }
      })
      .catch(() => {
        this.setState({
          errorLogIn: true
        })
      })
  }

  render() {
    const { user, pass, passError, userError, errorLogIn, entry } = this.state

    if (entry) {
      return (
        <Redirect to="/todo" />
      )
    }

    return (
      <React.Fragment>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src={logo} /> Log-in to your account
          </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='user'
                  value={user}
                  placeholder='E-mail address'
                  onChange={this.handleChangeInput}
                  error={userError}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='pass'
                  value={pass}
                  onChange={this.handleChangeInput}
                  error={passError}
                />
                <Button color='teal' fluid size='large' onClick={this.handleOnSubmit}>
                  Login
              </Button>
              </Segment>
            </Form>
            {errorLogIn &&
              (
                <Message negative>
                  User y/o password wrong
              </Message>
              )
            }
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Index;