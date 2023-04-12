const API_KEY = process.env.API_KEY;

export const fetchWithAuth = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}`, 'User-Agent': '*' },
  });
