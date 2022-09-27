import { cjourneyRepo } from 'helpers/cjourney-repo'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const body = JSON.parse(req.body)
  cjourneyRepo.create(body)

  res.statusCode = 200
  res.json({ success: true })
}
