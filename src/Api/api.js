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

export const UPDATE_USER = (body) => {
  return {
    url: API_URL + '/api/usuario',
    options: {
      method: 'PUT',
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

export const USER_OTHER_GET = (key) => {
  return {
    url: API_URL + `/api/usuario/${key}`,
    options: {
      method: 'GET',
      cache: 'no-store',
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

export const PRODUCT_GET = (slug) => {
  return {
    url: API_URL + `/api/produto/${slug}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PRODUCTS_GET = ({ page, total, user }) => {
  return {
    url: `${API_URL}/api/produtos/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PRODUCTS_GET_BY_CATEGORY = ({
  category,
  subcategory,
  actualPage,
  order,
  search,
}) => {
  const categoryPath = category ? `${category}/` : '';
  const subcategoryPath = subcategory ? subcategory + '/' : '';
  const searchQuery = search && !categoryPath ? `&q=${search}` : '';

  const url = `${API_URL}/api/produtos/${categoryPath}${subcategoryPath}?_page=${actualPage}${searchQuery}&_order=${order}`;

  const options = {
    method: 'GET',
    cache: 'no-store',
  };

  return {
    url,
    options,
  };
};

export const PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY = (category, subcategory, user) => {
  return {
    url: `${API_URL}/api/produtos/${category}/${subcategory}${
      user ? '?user=' + user : ''
    }`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const COMMENT_PRODUCT_POST = (body, token) => {
  return {
    url: API_URL + '/api/comentario',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const LIKE_PRODUCT_POST = ({ body, token }) => {
  return {
    url: API_URL + '/api/curtir',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const LIKE_PRODUCTS_GET = ({ page, total, user }) => {
  return {
    url: `${API_URL}/api/curtidas/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const UNLIKE_PRODUCT = ({ slug, token }) => {
  return {
    url: `${API_URL}/api/curtida/${slug}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    },
  };
};

export const LIKE_PRODUCT_GET = ({ slug, token }) => {
  return {
    url: `${API_URL}/api/curtida/${slug}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    },
  };
};
