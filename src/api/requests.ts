import type { Movie, Quote, Character } from 'src/models';
import { fetchWithAuth } from './fetch';
import * as urls from './urls';

interface MoviesResponse {
  docs: Movie[];
}

export const getMovies = async (): Promise<Movie[]> => {
  const res = await fetchWithAuth(urls.movies);
  const data = (await res.json()) as MoviesResponse;

  return data.docs;
};

interface MovieResponse {
  docs: Movie[];
}

export const getMovie = async (movieId: string): Promise<Movie> => {
  const res = await fetchWithAuth(urls.movie(movieId));
  const data = (await res.json()) as MovieResponse;

  return data.docs[0];
};

interface MovieQuotesResponse {
  docs: Quote[];
}

export const getMovieQuotes = async (movieId: string): Promise<Quote[]> => {
  const res = await fetchWithAuth(urls.movieQuotes(movieId));
  const data = (await res.json()) as MovieQuotesResponse;

  return data.docs;
};

interface CharactersResponse {
  docs: Character[];
}

export const getCharacters = async (): Promise<Character[]> => {
  const res = await fetchWithAuth(urls.characters);
  const data = (await res.json()) as CharactersResponse;

  return data.docs;
};

interface CharacterResponse {
  docs: Character[];
}

export const getCharacter = async (characterId: string): Promise<Character> => {
  const res = await fetchWithAuth(urls.character(characterId));
  const data = (await res.json()) as CharacterResponse;

  return data.docs[0];
};

interface CharacterQuotesResponse {
  docs: Quote[];
}

export const getCharacterQuotes = async (
  characterId: string
): Promise<Quote[]> => {
  const res = await fetchWithAuth(urls.characterQuotes(characterId));
  const data = (await res.json()) as CharacterQuotesResponse;

  return data.docs;
};
