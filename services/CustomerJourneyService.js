export const addApiCustomerJourney = async (selecteds) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/customer-journey`

  const formData = new FormData()
  formData.append('points', Object.values(selecteds).join(','))

  return fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
