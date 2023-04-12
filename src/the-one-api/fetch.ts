const THE_ONE_API_KEY = process.env.THE_ONE_API_KEY;

export const fetchWithAuth = async (url: string): Promise<Response> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${THE_ONE_API_KEY}`,
      Accept: 'application/json, text/plain, */*',
      'User-Agent': '*',
    },
  });

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return response;
};
