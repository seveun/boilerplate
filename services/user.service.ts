import axios from 'axios'

const URL = process.env.NEXT_PUBLIC_SERVER_URL + '/user'

export const get = async (accessToken: string) => {
  const { data } = await axios.get(URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return data
}
