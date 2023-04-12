const baseUrl = 'https://the-one-api.dev/v2';

export const movies = () => `${baseUrl}/movie?sort=_id:desc`;
export const movie = (id: string) => `${baseUrl}/movie/${id}`;
export const movieQuotes = (id: string) => `${baseUrl}/movie/${id}/quote`;

export const characters = () => `${baseUrl}/character?sort=name:asc`;
export const character = (id: string) => `${baseUrl}/character/${id}`;
export const characterQuotes = (id: string) =>
  `${baseUrl}/character/${id}/quote`;
