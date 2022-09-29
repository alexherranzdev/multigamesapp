const { adaptor } = require('next-export-api')
const { default: handler } = require('../../.next/server/pages/api/quiz.js')

module.exports.handler = adaptor(handler)
