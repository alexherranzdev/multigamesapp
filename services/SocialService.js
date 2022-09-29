export const uploadPhoto = async ({ id, image }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/upload`

  const formData = new FormData()
  formData.append('id', id)
  formData.append('image', image)

  return fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
