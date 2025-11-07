
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001/api';
console.log('API_URL in client:', API_URL);

export async function api(path, { method = 'GET', body, token } = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    return data;

  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Network error: could not reach API (check server, port, or URL)');
    }
    throw err;
  }
}
