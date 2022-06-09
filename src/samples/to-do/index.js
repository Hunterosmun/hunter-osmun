import axios from 'axios'
import { nanoid } from 'nanoid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'

import * as Ui from '../../ui'

const gql = a => a[0]
// App is currently at todos.hunter.osmun.net

// To do:
// [x] Make bottom-bar buttons work
// [x] Convert to graphql
// [ ] Fix Graphql-eslint errors
// [x] Change structure to match graphql
// [x] Change page loading (only 1 api call)
// [ ] Scale elements for readability on small screens and phones
// [ ] Users
// [ ] Check out React Icons for check-boxes?
// [ ] Editable tasks? (Add way to change task text)
// [ ] Change URL so refresh keeps correct list on screen
// [ ] Clear Completed Button
// [ ] Make phone compatable (Maybe make list selector snap to top?)

export default function ToDo () {
  const [toDo, setToDo] = React.useState([])
  const [text, setText] = React.useState('')
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    axios
      .post('/graphql', {
        operationName: 'FetchLists',
        query: gql`
          query FetchLists {
            allLists {
              id
              tasks {
                finished
                id
                text
              }
              title
            }
          }
        `,
        variables: {}
      })
      .then(res => setToDo(res.data.data.allLists))
  }, [])

  return (
    <Wrapper>
      <ContentWrap>
        <ListNames>
          <Ui.Floaty top='31px' left='39px'>
            <Ui.Button as={Link} to='/' style={{ color: 'black' }}>
              Home
            </Ui.Button>
          </Ui.Floaty>
          <h2>To Do's:</h2>
          <NewListInput
            type='text'
            placeholder='New To Do List'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                axios
                  .post('/graphql', {
                    operationName: 'NewList',
                    query: gql`
                      mutation NewList($input: String!) {
                        createList(input: $input) {
                          id
                          title
                          tasks {
                            id
                            text
                            finished
                          }
                        }
                      }
                    `,
                    variables: { input: text }
                  })
                  .then(res => setToDo([...toDo, res.data.data.createList]))
                setText('')
                setActive(toDo.length)
              }
            }}
          />
          {toDo.map((list, i) => (
            <button key={i} onClick={() => setActive(i)}>
              {list.title}
            </button>
          ))}
        </ListNames>
        {toDo.map((each, i) => {
          if (i !== active) return <></>
          return (
            <Lists
              key={i}
              list={each}
              setToDo={setToDo}
              // activeList={setActive}
              activeList={() => setActive(i - 1 || 0)}
              addTask={task => {
                const newToDo = _.cloneDeep(toDo)
                newToDo[i].tasks.push(task)
                setToDo(newToDo)
              }}
              deleteList={list => {
                let newToDo = _.cloneDeep(toDo)
                newToDo = newToDo.filter(l => l.id !== list.id)
                setToDo(newToDo)
              }}
              deleteTask={list => {
                const newToDo = _.cloneDeep(toDo)
                const index = newToDo.findIndex(l => l.id === list.id)
                newToDo.splice(index, 1, list)
                setToDo(newToDo)
              }}
            />
          )
        })}
      </ContentWrap>
    </Wrapper>
  )
}

const Lists = ({
  list,
  setToDo,
  addTask,
  deleteList,
  deleteTask,
  activeList
}) => {
  const [text, setText] = React.useState('')
  const [whichActive, setActive] = React.useState('all')

  const listItems = list.tasks

  const unfinished = listItems.filter(list => !list.finished).length
  const renderedItems = listItems.filter(list => {
    if (whichActive === 'all') return true
    if (whichActive === 'active' && !list.finished) return true
    if (whichActive === 'completed' && list.finished) return true
    return false
  })

  return (
    <List>
      <h3>{list.title}</h3>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            axios
              .post('/graphql', {
                operationName: 'AddTask',
                query: gql`
                  mutation AddTask($addTaskId: ID!, $input: TaskInput!) {
                    addTask(id: $addTaskId, input: $input) {
                      id
                      text
                      finished
                    }
                  }
                `,
                variables: {
                  addTaskId: list.id,
                  input: { text, id: nanoid(), finished: false }
                }
              })
              .then(res => addTask(res.data.data.addTask))
            setText('')
          }
        }}
      />
      <ItemsWrap>
        {renderedItems.map(task => {
          return (
            <OneItem
              key={task.id}
              task={task}
              list={list}
              setToDo={setToDo}
              deleteTask={deleteTask}
            />
          )
        })}
        <DeleteBtn
          onClick={() => {
            axios
              .post('/graphql', {
                operationName: 'Deleted',
                query: gql`
                  mutation Deleted($input: ID!) {
                    deleteList(input: $input)
                  }
                `,
                variables: { input: list.id }
              })
              .then(() => deleteList(list))
            activeList()
          }}
        >
          Delete
        </DeleteBtn>
      </ItemsWrap>
      {listItems.length ? (
        <BottomBar>
          <div>
            {unfinished}/{listItems.length} items left
          </div>
          <div>
            <button
              data-active={whichActive === 'all'}
              onClick={() => setActive('all')}
            >
              All
            </button>
            <button
              data-active={whichActive === 'active'}
              onClick={() => setActive('active')}
            >
              Active
            </button>
            <button
              data-active={whichActive === 'completed'}
              onClick={() => setActive('completed')}
            >
              Completed
            </button>
          </div>
          <div>
            <button>Clear Completed</button>
          </div>
        </BottomBar>
      ) : (
        <div />
      )}
    </List>
  )
}

const OneItem = ({ task, list, deleteTask }) => {
  const [active, setActive] = React.useState(task.finished)
  return (
    <ItemWrapper>
      <input
        type='checkbox'
        checked={active}
        onChange={e => {
          setActive(e.target.checked)
          axios.post('/graphql', {
            operationName: 'ChangeTask',
            query: gql`
              mutation ChangeTask($addTaskId: ID!, $input: TaskInput!) {
                addTask(id: $addTaskId, input: $input) {
                  id
                  text
                  finished
                }
              }
            `,
            variables: {
              addTaskId: list.id,
              input: {
                text: task.text,
                id: task.id,
                finished: e.target.checked
              }
            }
          })
        }}
      />
      <TextWrap className={active ? 'finished' : ''}>{task.text}</TextWrap>
      <Btn
        onClick={() => {
          axios
            .post('/graphql', {
              operationName: 'DeleteOne',
              query: gql`
                mutation DeleteOne($deleteTaskId: ID!, $input: ID!) {
                  deleteTask(id: $deleteTaskId, input: $input) {
                    id
                    title
                    tasks {
                      id
                      text
                      finished
                    }
                  }
                }
              `,
              variables: { deleteTaskId: task.id, input: list.id }
            })
            .then(res => deleteTask(res.data.data.deleteTask))
        }}
      >
        ✕
      </Btn>
    </ItemWrapper>
  )
}

const Wrapper = styled.div`
  margin: 24px 24px 24px 24px;
  /* margin: 0 auto; */
`

const ContentWrap = styled.div`
  display: flex;
  align-items: flex-start;
`

const ListNames = styled.div`
  margin-top: 30px;
  padding: 4px;
  width: 200px;
  max-height: calc(100vh - 60px);
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  box-sizing: border-box;

  & > button {
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 4px;
    padding: 8px;
  }
  & > button:hover {
    background-color: #ddd;
  }
  & > h2 {
    font-family: sans-serif;
    font-size: 48px;
    font-weight: lighter;
    margin: 0 0 16px 0;
  }
`

const List = styled.div`
  box-shadow: 0px 0px 16px 1px #bbb;
  margin-left: 24px;
  flex: 1;
  min-width: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 60px);

  & > h3 {
    margin: 0 0 4px 0px;
    padding: 16px 24px;
    font-size: 48px;
    font-weight: 200;
    box-shadow: 0px 2px 6px #ddd;
  }
  & input {
    margin: 0 8px 0 8px;
  }
  & > input {
    box-shadow: inset 0px -2px 4px #ddd;
    box-sizing: border-box;
    margin: 0;
    font-size: 32px;
    font-family: sans-serif;
    &::placeholder {
      color: #bbb;
      font-weight: lighter;
    }
    padding: 14px 16px 16px 16px;
    border: none;
    width: 100%;
  }
`

const ItemsWrap = styled.div`
  overflow: auto;
  flex: 1;
`

const ItemWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  
  font-size: 24px;
  font-weight: 200;
  & > div.finished {
    /* color: ${p => (p.finished ? 'red' : 'black')}; */
    color: #aaa;
    text-decoration: line-through;
  }
  `

const TextWrap = styled.div`
  overflow: auto;
  margin-right: 50px;
`

const Btn = styled.button`
  margin-right: 20px;
  background-color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 100px;
  font-size: 24px;
  position: absolute;
  right: -4px;

  &:hover {
    background-color: #f8bcbc85;
  }
`

const DeleteBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #f3a4a486;
  border: 1px solid #777;
  padding: 4px 8px;
  border-radius: 8px;

  &:hover {
    background-color: #f88383a2;
  }
`

const BottomBar = styled.div`
  padding: 12px 12px;
  font-size: 16px;
  font-weight: 200;
  color: #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 60px;
  /* position: absolute;
  bottom: 8px; */

  & button {
    background-color: white;
    border: 1px solid transparent;
    font-size: 16px;
    font-weight: 200;
    color: #888;
    border-radius: 8px;
    padding: 4px;

    &[data-active='true'] {
      border-color: #bbb;
    }
  }

  & button:hover {
    background-color: #eee;
  }
`

const NewListInput = styled.input`
  margin-bottom: 16px;
  padding: 16px 8px;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 300;
  border-radius: 16px;
  border: 1px solid #999;
`
