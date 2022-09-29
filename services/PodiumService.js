export const addApiPodium = async ({ id, question, value }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/podium`

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
