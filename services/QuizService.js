import { questionsRepo } from 'helpers/questions-repo'

export const addAnswerA = async (question) => {
  questionsRepo.create(question)
}

export const addAnswer = async ({ id, question, value }) => {
  return fetch('/api/quiz', {
    method: 'POST',
    body: JSON.stringify({
      question_id: id,
      question,
      value
    })
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
