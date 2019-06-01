import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Table } from 'semantic-ui-react'

class HomeUser extends React.Component {

  constructor() {
    super()
    axios.defaults.baseURL = 'http://localhost:3001/'
    // axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`}
    // console.log(`bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`)
  }
  
  state = {
    listUsers: [],
    loadingListUser: true,
  }

  componentDidMount()  {
    axios.get('api/user')
      .then(res => {
        this.setState({
          listUsers: res.data,
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
        <Table celled loading={loadingListUser}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
              <Table.Cell>First</Table.Cell>
              </Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
          )
        }
      }
      
export default HomeUser