export const uploadPhoto = async ({ id, image }) => {
  return fetch('https://somosexperiences.dev/wkapp/social.php', {
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
