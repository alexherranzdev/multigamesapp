const { adaptor } = require('next-export-api')
const { default: handler } = require('../../.next/server/pages/api/social.js')

module.exports.handler = adaptor(handler)
