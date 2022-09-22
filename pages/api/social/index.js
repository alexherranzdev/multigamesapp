const { mkdir, writeFileSync, existsSync } = require('fs')

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id, image } = JSON.parse(req.body)
  const data = image.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(data, 'base64')

  const matches = image.match(/^data:image\/(.*);base64/)
  const ext = matches[1] || 'jpg'
  const fileName = `${id}.${ext}`

  if (!existsSync('public/images/social')) {
    mkdir('public/images/social', { recursive: true })
  }

  writeFileSync(`public/images/social/${fileName}`, buf)

  res.statusCode = 200
  res.json({ success: true, fileName })
}
