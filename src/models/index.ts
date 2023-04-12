type UUID = string;

export interface Movie {
  _id: UUID;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Character {
  _id: UUID;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
}

export interface Quote {
  _id: UUID;
  dialog: string;
  movie: UUID;
  character: UUID;
}
