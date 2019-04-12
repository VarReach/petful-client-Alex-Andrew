import config from '../config';

let _timeoutId;
let _THIRTY_SECOND_IN_MS = 30 * 1000;

const UsersApiService = {
  postUserToQueue(user) {
    console.log(user);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    };
    return fetch(`${config.API_ENDPOINT}/users`, options)
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json();
      })
      .then(resJson => {
        window.sessionStorage.setItem(config.USER_KEY, resJson.user_name);
        return resJson;
      });
  },
  getQueuePosition(user) {
    const options = {
      method: 'GET',
    };
    return fetch(`${config.API_ENDPOINT}/users/${user.user_name}`, options)
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json();
      });
  },
  setTimeout(timeout) {
    _timeoutId = setTimeout(timeout, _THIRTY_SECOND_IN_MS);
  },
  clearTimeout() {
    clearTimeout(_timeoutId);
  }
}

export default UsersApiService;