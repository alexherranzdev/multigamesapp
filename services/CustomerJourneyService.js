export const addApiCustomerJourney = async (podium) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/customer-journey`

  const formData = new FormData()
  formData.append('podium_1', podium[1]?.map((p) => p.text).join(',') || '')
  formData.append('podium_2', podium[2]?.map((p) => p.text).join(',') || '')
  formData.append('podium_3', podium[3]?.map((p) => p.text).join(',') || '')

  return fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
