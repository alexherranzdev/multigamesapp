export const uploadPhoto = async ({ id, image }) => {
  return fetch('/api/social', {
    method: 'POST',
    body: JSON.stringify({
      id,
      image
    })
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
