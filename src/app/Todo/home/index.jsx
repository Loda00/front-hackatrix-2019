import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { List, Table } from 'semantic-ui-react'

const temas = [
  {
    title: 'Los Planetas',
    curso: 'Astronomia'
  },
  {
    title: 'Los dinosaurios',
    curso: 'Historia'
  },
  {
    title: 'Las plantas carnívoras',
    curso: 'Ciencias Ambientales'
  },
  {
    title: 'La edad de Piedra',
    curso: 'Historia'
  },
  {
    title: 'El agua',
    curso: 'Ciencias Ambientales'
  },
  {
    title: 'Los volcanes',
    curso: 'Geología'
  },
]

class Home extends React.Component {
  constructor() {
    super()
    axios.defaults.baseURL = 'http://localhost:3001/'
    axios.defaults.headers.common = { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}` }
    // console.log(`bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`)
  }

  state = {
    listUsers: [],
    loadingListUser: true,
    skilles: temas,
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

    const { listUsers, loadingListUser, skilles } = this.state

    return (
      <div
        style={
          {
            display: 'flex'
          }
        }
      >
        <Table
          style={
            {
              width: '400px',
              margin: '20px 50px'
            }
          }
        >
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
        <List divided relaxed
          style={
            {
              width: '400px',
              padding: '20px 50px'
            }
          }
        >
          {
            skilles.map((skill, i) => {
              return (
                <List.Item key={i}>
                  <List.Icon name='book' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>{skill.title}</List.Header>
                    <List.Description as='a'>{skill.curso}</List.Description>
                  </List.Content>
                </List.Item>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default Home