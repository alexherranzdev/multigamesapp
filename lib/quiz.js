import fs from 'fs'
import path from 'path'

export const addAnswer = (body) => {
  const fileName = path.join('./store', 'questions.json')

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      return { message: err.message }
    }

    const content = JSON.parse(data || '[]') || []

    content.push(body)

    fs.writeFile(fileName, JSON.stringify(content), (err2) => {
      if (err2) {
        return err2
      }
    })
  })

  return { success: true }
}
