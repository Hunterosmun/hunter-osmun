require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
async function main () {
  console.log('Hopefully she runs Captain!')
  await client.connect()

  const app = express()
  const port = process.env.PORT || 3001

  app.use(express.json())
  app.use(cors())

  app.use(express.static('build'))

  const db = client.db('lists')
  app.listen(port, () => {
    console.log(`Ze app is up Captain! Port: ${port}`)
  })

  app.post('/api/post/list', (req, res) => {
    postList(req, res).catch(err => console.error(err))
  })
  app.get('/api/get/lists', (req, res) => {
    getLists(req, res).catch(err => console.error(err))
  })
  app.delete('/api/delete/:list', (req, res) => {
    deleteList(req, res).catch(err => console.error(err))
  })

  app.post('/api/post/:list/task', (req, res) => {
    postTask(req, res).catch(err => console.error(err))
  })
  app.delete('/api/delete/:list/:task', (req, res) => {
    deleteTask(req, res).catch(err => console.error(err))
  })
  app.put('/api/put/:list/:task', (req, res) => {
    putTask(req, res).catch(err => console.error(err))
  })

  // -------------------------------------------------------------------------- //
  // --------------------------------- Lists ---------------------------------- //
  // -------------------------------------------------------------------------- //

  // create
  async function postList (req, res) {
    const lists = db.collection('lists')

    await lists.insertOne(req.body)
    res.sendStatus(201)
  }

  // read
  async function getLists (req, res) {
    const lists = db.collection('lists')

    const results = await lists.find({}).toArray()
    res.send(results)
  }

  // edit

  // delete
  async function deleteList (req, res) {
    await db
      .collection('lists')
      .findOneAndDelete({ _id: ObjectId(req.params.list) })
    res.send('200')
  }

  // -------------------------------------------------------------------------- //
  // --------------------------------- Tasks ---------------------------------- //
  // -------------------------------------------------------------------------- //

  // create
  async function postTask (req, res) {
    const lists = db.collection('lists')
    const list = await lists.findOne({ _id: ObjectId(req.params.list) })

    await lists.findOneAndReplace(
      { _id: ObjectId(req.params.list) },
      {
        ...list,
        [req.body.id]: {
          text: req.body.text,
          finished: req.body.finished
        }
      }
    )
    res.send({
      [req.body.id]: {
        text: req.body.text,
        finished: req.body.finished
      }
    })
  }

  // read - Unneeded (they're part of List)

  // edit
  async function putTask (req, res) {
    const lists = db.collection('lists')
    const list = await lists.findOne({ _id: ObjectId(req.params.list) })

    await lists.findOneAndReplace(
      { _id: ObjectId(req.params.list) },
      {
        ...list,
        [req.params.task]: {
          text: req.body.text,
          finished: req.body.finished
        }
      }
    )
    res.sendStatus(200)
  }

  // delete
  async function deleteTask (req, res) {
    const lists = db.collection('lists')
    const list = await lists.findOne({ _id: ObjectId(req.params.list) })
    const newList = { ...list }

    delete newList[req.params.task]

    await lists.findOneAndReplace({ _id: ObjectId(req.params.list) }, newList)
    res.send(newList)
  }
}
main()
