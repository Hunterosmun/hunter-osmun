const { ObjectId } = require('mongodb')

// -------------------------------------------------------------------------- //
// --------------------------------- Lists ---------------------------------- //
// -------------------------------------------------------------------------- //

// create
exports.postList = async function postList (db, newList) {
  const lists = db.collection('lists')
  const resp = await lists.insertOne({ title: newList, tasks: [] })
  return resp.insertedId
}

// read
exports.getLists = function getLists (db) {
  const lists = db.collection('lists')
  return lists.find({}).toArray()
}

// read one
exports.getList = function getLists (db, listId) {
  const lists = db.collection('lists')
  return lists.findOne({ _id: ObjectId(listId) })
}

// edit

// delete
exports.deleteList = async function deleteList (db, listId) {
  await db.collection('lists').findOneAndDelete({ _id: ObjectId(listId) })
}

// -------------------------------------------------------------------------- //
// --------------------------------- Tasks ---------------------------------- //
// -------------------------------------------------------------------------- //

// create
exports.setTask = async function (db, listId, input) {
  const lists = db.collection('lists')
  const list = await lists.findOne({ _id: ObjectId(listId) })

  const newTasks = [...list.tasks]
  let index = list.tasks.findIndex(t => t.id === input.id)
  if (index === -1) index = newTasks.length
  newTasks.splice(index, 1, input)

  await lists.findOneAndReplace(
    { _id: ObjectId(listId) },
    { id: list.id, title: list.title, tasks: [...newTasks] }
  )
  return input
}

// delete
exports.deleteTask = async function deleteTask (db, listId, taskId) {
  const lists = db.collection('lists')
  const list = await lists.findOne({ _id: ObjectId(listId) })
  const newList = { ...list }

  newList.tasks = [...list.tasks.filter(t => t.id !== taskId)]

  await lists.findOneAndReplace({ _id: ObjectId(listId) }, newList)
  return newList
}
