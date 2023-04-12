const baseUrl = 'https://the-one-api.dev/v2';

export const movies = `${baseUrl}/movie?sort=_id:desc`;
export const movie = (uuid: string) => `${baseUrl}/movie/${uuid}`;
export const movieQuotes = (uuid: string) => `${baseUrl}/movie/${uuid}/quote`;

export const characters = `${baseUrl}/character`;
