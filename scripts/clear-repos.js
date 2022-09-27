const fs = require('fs')

fs.readdir('public/store', (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      fs.writeFileSync(`public/store/${file}`, '[]')
    }
  })
})
