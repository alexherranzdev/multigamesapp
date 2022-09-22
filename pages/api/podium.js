import { podiumRepo } from 'helpers/podium-repo'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const body = JSON.parse(req.body)
  podiumRepo.create(body)

  res.statusCode = 200
  res.json({ success: true })
}
