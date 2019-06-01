import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { List, Table } from 'semantic-ui-react'

const temas = [
  {
    id: 0,
    title: 'Los Planetas',
    curso: 'Astronomia'
  },
  {
    id: 1,
    title: 'Los dinosaurios',
    curso: 'Historia'
  },
  {
    id: 2,
    title: 'Las plantas carnívoras',
    curso: 'Ciencias Ambientales'
  },
  {
    id: 3,
    title: 'La edad de Piedra',
    curso: 'Historia'
  },
  {
    id: 4,
    title: 'El agua',
    curso: 'Ciencias Ambientales'
  },
  {
    id: 5,
    title: 'Los volcanes',
    curso: 'Geología'
  },
]

class Home extends React.Component {
  constructor() {
    super()
    axios.defaults.baseURL = 'http://localhost:3001/'
    axios.defaults.headers.common = { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}` }
  }

  state = {
    listUsers: [],
    loadingListUser: true,
    skilles: temas,
    sendSkills: [],
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

  addCurso = (id) => {
    const { skilles, sendSkills } = this.state
    
    console.log('click', id)

    sendSkills.push(skilles[id])

    skilles.splice(id, 1);

    this.setState({
      sendSkills,
      skilles,
    })

  }

  render() {

    const { sendSkills, skilles } = this.state
    console.log('skilles', skilles, sendSkills)

    return (
      <div
        style={
          {
            display: 'flex',
            margin: '0px 10% '
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
              sendSkills &&
              sendSkills.map((skill, i) => (
                
                <Table.Row key={i}>
                  {console.log('skill', skill)}
                  <Table.Cell>{skill.title}</Table.Cell>
                  <Table.Cell>{skill.curso}</Table.Cell>
                  <Table.Cell>{skill.id}</Table.Cell>
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
          <h4>Temas : </h4>
          {
            skilles.map((skill, i) => {
              return (
                <List.Item key={i}>
                  <List.Icon name='book' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>{skill.title}</List.Header>
                    <List.Description as='a'>{skill.curso}</List.Description>
                  </List.Content>
                  <List.Icon style={{cursor: 'pointer'}} name='plus' size='large' verticalAlign='middle'
                    onClick={() => this.addCurso(skill.id)}
                  />
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