// ─── API konfiguráció ─────────────────────────────────────────────────────────
export const BASE = 'https://nodejs313.dszcbaross.edu.hu';
const API = `${BASE}/api`;

// ─── Segédfüggvény ─────────────────────────────────────────────────────────
const req = async (url, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const res = await fetch(url, { 
    ...options, 
    headers,
    credentials: 'include'
  });
  return res;
};

// ─── Cookie segédfüggvények ────────────────────────────────────────────────
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// ─── Autók ───────────────────────────────────────────────────────────────────
export const getCars = async () => {
  const res = await fetch(`${API}/cars`, {
    credentials: 'include'
  });
  return res.json();
};

export const getCarById = async (id) => {
  const res = await fetch(`${API}/cars/${id}`, {
    credentials: 'include'
  });
  return res.json();
};

export const createCar = async (carData) => {
  const res = await req(`${API}/cars`, {
    method: 'POST',
    body: JSON.stringify(carData),
  });
  return res.json();
};

export const updateCar = async (id, carData) => {
  const res = await req(`${API}/cars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(carData),
  });
  return res.json();
};

export const deleteCar = async (id) => {
  const res = await req(`${API}/cars/${id}`, { method: 'DELETE' });
  return res.json();
};

// ─── Képek ───────────────────────────────────────────────────────────────────
// Csak filename-t küld vissza
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('kep', file);
  const res = await fetch(`${API}/upload`, { 
    method: 'POST', 
    body: formData,
    credentials: 'include'
  });
  return res.json();
};

export const deleteImage = async (filename) => {
  const res = await req(`${API}/upload/${filename}`, { method: 'DELETE' });
  return res.json();
};

export const getImages = async () => {
  const res = await fetch(`${API}/images`, {
    credentials: 'include'
  });
  return res.json();
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const login = async (email, password) => {
  try {
    const res = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      console.error(`HTTP hiba: ${res.status}`, res.statusText);
    }
    
    const data = await res.json();
    console.log('Login válasz:', data);
    return data;
  } catch (error) {
    console.error('Login fetch hiba:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await req(`${API}/users/logout`, {
      method: 'POST',
    });
    return res.json();
  } catch (error) {
    console.error('Logout hiba:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const res = await req(`${API}/me`, {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.error('getMe hiba:', error);
    throw error;
  }
};

// ─── User ─────────────────────────────────────────────────────────────────────
export const updateUser = async (id, data) => {
  const res = await req(`${API}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getUser = async (id) => {
  const res = await req(`${API}/users/${id}`, {
    method: 'GET',
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await req(`${API}/users/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};


export const getImageUrl = (filename) => {
  return `${BASE}/uploads/${filename}`;
};
