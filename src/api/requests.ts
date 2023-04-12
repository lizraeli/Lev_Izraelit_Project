import { fetchWithAuth } from './fetch';
import * as urls from './urls';
import type { Movie } from 'src/models/Movie';

interface MoviesResponse {
  docs: Movie[];
}

export const getMovies = async (): Promise<Movie[]> => {
  const res = await fetchWithAuth(urls.movies);
  const data = (await res.json()) as MoviesResponse;
  return data.docs;
};
