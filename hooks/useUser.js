import { useEffect, useState } from 'react'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export const getAccessUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }

  return USER_STATES.NOT_LOGGED
}

export const setAccessUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const logout = () => {
  localStorage.removeItem('user')
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_LOGGED)

  useEffect(() => {
    setUser(getAccessUser())
  }, [])

  return user
}
