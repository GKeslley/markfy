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
