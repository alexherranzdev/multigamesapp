const { writeFileSync } = require('fs')

let podiums = require('public/store/podium.json')

export const podiumRepo = {
  getAll: () => podiums,
  getById: (id) => podiums.find((x) => x.id.toString() === id.toString()),
  find: (x) => podiums.find(x),
  create,
  update,
  delete: _delete
}

function create(question) {
  // generate new question id
  question.id = podiums.length ? Math.max(...podiums.map((x) => x.id)) + 1 : 1

  // set date created and updated
  question.dateCreated = new Date().toISOString()
  question.dateUpdated = new Date().toISOString()

  // add and save question
  podiums.push(question)
  saveData()
}

function update(id, params) {
  const question = podiums.find((x) => x.id.toString() === id.toString())

  // set date updated
  question.dateUpdated = new Date().toISOString()

  // update and save
  Object.assign(question, params)
  saveData()
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  podiums = podiums.filter((x) => x.id.toString() !== id.toString())
  saveData()
}

// private helper functions
function saveData() {
  writeFileSync('public/store/podium.json', JSON.stringify(podiums, null, 4))
}
