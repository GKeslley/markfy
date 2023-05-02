const API_URL = 'http://localhost/wordpress/wp-json';

export const POST_USER = (body) => {
  return {
    url: API_URL + '/api/usuario',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const LOGIN_USER_POST = (body) => {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const VALIDATE_TOKEN = (token) => {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};

export const USER_GET = (token) => {
  return {
    url: API_URL + '/api/usuario',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};
