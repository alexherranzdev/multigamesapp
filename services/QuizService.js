export const addApiAnswer = async ({ id, question, value }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz`

  const formData = new FormData()
  formData.append('question_id', id)
  formData.append('question', question)
  formData.append('value', value)

  return fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
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
