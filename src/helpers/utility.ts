export const isAuthenticated = () => {
  let authenticated = false
  const store = localStorage.getItem('easyTravel')
  if (store) {
    const storeParsed = JSON.parse(store)
    authenticated = storeParsed.authenticated
  }
  return authenticated
}
