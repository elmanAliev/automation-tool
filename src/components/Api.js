export default class Api {
    constructor({ baseUrl, headers }) {  
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    postMessage(inputValue) {
        return fetch(this._baseUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.email
            })
        })
        .then((res) => this._handleResponse(res));
    }
}