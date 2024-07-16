export const isAuthenticated = () => {
  let authenticated = false
  const store = localStorage.getItem('easyTravel')
  if (store) {
    const storeParsed = JSON.parse(store)
    authenticated = storeParsed.authenticated
  }
  return authenticated
}

export const formatDate = (date: string | null) => {
  if (!date) {
    return ''
  }

  return new Date(date).toISOString().split('T')[0]
}
