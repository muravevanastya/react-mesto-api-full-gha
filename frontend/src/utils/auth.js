// export const BASE_URL = 'https://api.places.nomoredomains.monster';
export const BASE_URL = 'http://localhost:3000';


const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    // credentials: 'include',
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
    // credentials: 'include',
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
    // credentials: 'include',
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
      // const { token } = data;
      // localStorage.setItem('jwt', token);

      // return token;
    }
  })
}; 
