const { writeFileSync } = require('fs')

let items = require('public/store/cjourney.json')

export const cjourneyRepo = {
  getAll: () => items,
  getById: (id) => items.find((x) => x.id.toString() === id.toString()),
  find: (x) => items.find(x),
  create,
  update,
  delete: _delete
}

function create(item) {
  // generate new item id
  item.id = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1

  // set date created and updated
  item.dateCreated = new Date().toISOString()
  item.dateUpdated = new Date().toISOString()

  // add and save item
  items.push(item)
  saveData()
}

function update(id, params) {
  const item = items.find((x) => x.id.toString() === id.toString())

  // set date updated
  item.dateUpdated = new Date().toISOString()

  // update and save
  Object.assign(item, params)
  saveData()
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  items = items.filter((x) => x.id.toString() !== id.toString())
  saveData()
}

// private helper functions
function saveData() {
  writeFileSync('public/store/cjourney.json', JSON.stringify(items, null, 4))
}
