export const BASE_URL = 'http://80.76.60.187:3004';


const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(handleResponse)
}; 

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
}; 


export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
  .then((data) => {
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt)
      return data.jwt
    }
  })
}; 
