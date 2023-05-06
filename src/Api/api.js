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

export const PRODUCT_POST = (formData, token) => {
  return {
    url: API_URL + '/api/produto',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
};

export const PRODUCTS_GET = ({ page, total, user }) => {
  return {
    url: `${API_URL}/api/produtos/?_page=${page}&_total=${total}$_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PRODUCTS_GET_BY_CATEGORY = (category) => {
  return {
    url: `${API_URL}/api/produtos/${category}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY = ({ category, subcategory }) => {
  return {
    url: `${API_URL}/api/produtos/${category}/${subcategory}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};
