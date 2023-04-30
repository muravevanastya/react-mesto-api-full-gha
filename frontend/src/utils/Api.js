class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  setUserInfoApi(name, about) {
    console.log('Вызов setUserInfo');
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  addUserCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  changeUserAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse);
  }
  
  changeLikeCardStatus(id, isLiked) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.places.nomoredomains.monster',
})

export {api}
