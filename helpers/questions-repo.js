const { writeFileSync } = require('fs')

let questions = require('public/store/questions.json')

export const questionsRepo = {
  getAll: () => questions,
  getById: (id) => questions.find((x) => x.id.toString() === id.toString()),
  find: (x) => questions.find(x),
  create,
  update,
  delete: _delete
}

function create(question) {
  // generate new question id
  question.id = questions.length
    ? Math.max(...questions.map((x) => x.id)) + 1
    : 1

  // set date created and updated
  question.dateCreated = new Date().toISOString()
  question.dateUpdated = new Date().toISOString()

  // add and save question
  questions.push(question)
  saveData()
}

function update(id, params) {
  const question = questions.find((x) => x.id.toString() === id.toString())

  // set date updated
  question.dateUpdated = new Date().toISOString()

  // update and save
  Object.assign(question, params)
  saveData()
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  questions = questions.filter((x) => x.id.toString() !== id.toString())
  saveData()
}

// private helper functions
function saveData() {
  writeFileSync(
    'public/store/questions.json',
    JSON.stringify(questions, null, 4)
  )
}
