require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { MongoClient } = require('mongodb')

const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')

const crud = require('./crud')

const gql = a => a[0]
const typeDefs = gql`
  type List {
    id: ID!
    title: String!
    tasks: [Task!]
    user: User
  }

  type Task {
    id: ID!
    text: String!
    finished: Boolean!
  }

  input TaskInput {
    id: ID!
    text: String!
    finished: Boolean!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    user(id: ID!): User
    allLists: [List!]
    list(id: ID!): List
  }

  type Mutation {
    createList(input: String!): List
    deleteList(input: ID!): String
    addTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!, input: ID!): List
  }
`
const resolvers = {
  Query: {
    allLists: (_, __, { db }) => {
      return crud.getLists(db)
    },
    user: (_, __, { user }) => user,
    list: (_, { id }, { db }) => crud.getList(db, id)
  },
  Mutation: {
    createList: async (_, { input }, { db }) => {
      const id = await crud.postList(db, input)
      return crud.getList(db, id)
    },
    deleteList: async (_, { input }, { db }) => {
      await crud.deleteList(db, input)
      return "Ended that man's career"
    },
    addTask: async (_, { id, input }, { db }) => {
      return await crud.setTask(db, id, input)
    },
    deleteTask: (_, { id, input }, { db }) => {
      return crud.deleteTask(db, input, id)
    }
  },
  List: {
    id: list => list._id
  }
}

async function main () {
  console.log('Hopefully she runs Captain!')
  const uri = process.env.MONGO_URI
  const client = new MongoClient(uri)
  const db = client.db('lists')
  await client.connect()

  const app = express()
  const port = process.env.PORT || 3001

  app.use((req, res, next) => {
    res.locals.user = { id: 7, name: 'Bubba' }
    res.locals.db = db
    next()
  })

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    context: ({ res }) => ({ user: res.locals.user, db: res.locals.db }),
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port }, resolve))
  console.log(`Ze app is up Captain! Port: ${port}`)

  app.use(express.json())
  app.use(cors())

  app.use(express.static('build'))

  app.post('/api/post/list', async (req, res) => {
    await crud.postList(res.locals.db, req.body)
    res.sendStatus(201)
  })
  app.get('/api/get/lists', async (req, res) => {
    const result = await crud.getLists(res.locals.db)
    res.send(result)
  })
  app.delete('/api/delete/:list', async (req, res) => {
    await crud.deleteList(res.locals.db, req.params.list)
    res.send('200')
  })

  app.post('/api/post/:list/task', async (req, res) => {
    const newTask = {
      [req.body.id]: {
        text: req.body.text,
        finished: req.body.finished
      }
    }
    await crud.setTask(res.locals.db, req.params.list, newTask)
    res.send(req.body)
  })
  app.delete('/api/delete/:list/:task', async (req, res) => {
    const newList = await crud.deleteTask(
      res.locals.db,
      req.params.list,
      req.params.task
    )
    res.send(newList)
  })
  app.put('/api/put/:list/:task', async (req, res) => {
    const existingTask = {
      id: req.params.task,
      text: req.body.text,
      finished: req.body.finished
    }
    await crud.setTask(res.locals.db, req.params.list, existingTask)
    res.send(existingTask)
  })
}
main()
