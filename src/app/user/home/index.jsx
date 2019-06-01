import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Table, Segment, Loader, Dimmer } from 'semantic-ui-react'

class HomeUser extends React.Component {

  constructor() {
    super()
    axios.defaults.baseURL = 'http://localhost:3001/'
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`}
    // console.log(`bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`)
  }

  state = {
    listUsers: [],
    loadingListUser: true,
  }

  componentDidMount() {
    axios.get('api/user')
      .then(res => {
        this.setState({
          listUsers: res.data.data,
          loadingListUser: false,
        })
      })
      .catch(e => console.log('e', e))
  }

  render() {

    const { listUsers, loadingListUser } = this.state
    console.log('listUsers', listUsers, loadingListUser)
    return (
      <React.Fragment>
        <div
          style={
            {
              width: '500px'
            }
          }
        >
          <Segment
            basic
          >
            <Dimmer
              active={loadingListUser}
            >
              <Loader />
            </Dimmer>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombres</Table.HeaderCell>
                  <Table.HeaderCell>Clase</Table.HeaderCell>
                  <Table.HeaderCell>E-mail</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  listUsers &&
                  listUsers.map((user, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{user.nombres}</Table.Cell>
                      <Table.Cell>{user.clase}</Table.Cell>
                      <Table.Cell>{user.mail}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Segment>
        </div>
      </React.Fragment>
    )
  }
}

export default HomeUser