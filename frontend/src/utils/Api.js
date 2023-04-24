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
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserInfoApi({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  addUserCard(data) {
    return fetch(this._baseUrl + '/cards', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeUserAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse);
  }
  
  changeLikeCardStatus(id, isLiked) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.places.nomoredomains.monster',
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export {api}
