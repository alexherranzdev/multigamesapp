import { questionsRepo } from 'helpers/questions-repo'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const body = JSON.parse(req.body)
  questionsRepo.create(body)

  res.statusCode = 200
  res.json({ success: true })
}
