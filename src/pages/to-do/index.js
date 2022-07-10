import { nanoid } from 'nanoid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'

import * as Ui from '../../ui'

// Database version of App is currently at todos.hunter.osmun.net

export default function ToDo () {
  const [toDo, setToDo] = React.useState([])
  const [text, setText] = React.useState('')
  const [active, setActive] = React.useState(0)

  return (
    <Wrapper>
      <ContentWrap>
        <ListNames>
          <Ui.Floaty top='31px' left='39px'>
            <Ui.Button as={Link} to='/' onWhite>
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
              if (e.key === 'Enter' && text !== '') {
                const id = nanoid()
                setToDo([...toDo, { title: text, id, tasks: [] }])
                setText('')
                setActive(toDo.length)
              }
            }}
          />
          <SubmitButton
            onClick={() => {
              if (text !== '') {
                const id = nanoid()
                setToDo([...toDo, { title: text, id, tasks: [] }])
                setText('')
                setActive(toDo.length)
              }
            }}
          >
            Submit
          </SubmitButton>
          {toDo.map((list, i) => (
            <button key={`${list.id}-sidebar`} onClick={() => setActive(i)}>
              {list.title}
            </button>
          ))}
        </ListNames>
        {toDo.map((list, i) => {
          if (i !== active) return <></>
          return (
            <Lists
              key={list.id}
              list={list}
              setToDo={setToDo}
              activeList={() => setActive(i - 1 || 0)}
              addTask={task => {
                const newToDo = _.cloneDeep(toDo)
                newToDo[i].tasks.push(task)
                setToDo(newToDo)
              }}
              setTask={task => {
                const newToDo = _.cloneDeep(toDo)
                const toChange = newToDo[i].tasks.find(t => t.id === task.id)
                toChange.finished = task.finished
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
  setTask,
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
          if (e.key === 'Enter' && text !== '') {
            const id = nanoid()
            addTask({ text, id, finished: false })
            setText('')
          }
        }}
      />
      <SmallSubmitButton
        onClick={() => {
          if (text !== '') {
            const id = nanoid()
            addTask({ text, id, finished: false })
            setText('')
          }
        }}
      >
        Submit
      </SmallSubmitButton>
      <ItemsWrap>
        {renderedItems.map(task => (
          <OneItem
            key={task.id}
            task={task}
            list={list}
            setToDo={setToDo}
            deleteTask={deleteTask}
            setTask={setTask}
          />
        ))}
        <DeleteBtn
          onClick={() => {
            deleteList(list)
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
            <button
              onClick={() => {
                const newList = _.cloneDeep(list)
                newList.tasks = newList.tasks.filter(t => !t.finished)
                deleteTask(newList)
              }}
            >
              Clear Completed
            </button>
          </div>
        </BottomBar>
      ) : (
        <div />
      )}
    </List>
  )
}

const OneItem = ({ task, list, deleteTask, setTask }) => {
  const [active, setActive] = React.useState(task.finished)
  return (
    <ItemWrapper>
      <input
        type='checkbox'
        checked={active}
        onChange={e => {
          setActive(e.target.checked)
          setTask({ ...task, finished: e.target.checked })
        }}
      />
      <TextWrap className={active ? 'finished' : ''}>{task.text}</TextWrap>
      <Btn
        onClick={() => {
          const newList = _.cloneDeep(list)
          newList.tasks = newList.tasks.filter(t => t.id !== task.id)
          deleteTask(newList)
        }}
      >
        ✕
      </Btn>
    </ItemWrapper>
  )
}

const Wrapper = styled.div`
  margin: 12px 12px 12px 12px;
`

const ContentWrap = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`

const ListNames = styled.div`
  margin-top: 60px;
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

const SubmitButton = styled.button`
  background-color: lightgreen;
  padding: 8px;
  :hover {
    background-color: #45c745 !important;
  }
  @media not all and (max-width: 500px) {
    display: none;
  }
`

const SmallSubmitButton = styled.button`
  background-color: lightgreen;
  padding: 16px 12px;
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 8px;
  top: 100px;
  right: 12px;
  font-size: 16px;
  :hover {
    background-color: #45c745;
  }
  @media not all and (max-width: 500px) {
    display: none;
  }
`

const List = styled.div`
  box-shadow: 0px 0px 16px 1px #bbb;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 60px);
  min-width: 450px;
  margin-left: 24px;

  @media (max-width: 500px) {
    min-width: 100%;
    margin-left: 0px;
  }

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
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  font-size: 24px;
  font-weight: 200;
  & > div.finished {
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
