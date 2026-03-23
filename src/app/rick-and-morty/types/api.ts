export type CharacterStatus = 'alive' | 'dead' | 'unknown' | '';
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown' | '';
export const LOCATION_TYPES = [
  'Planet',
  'Cluster',
  'Space station',
  'Microverse',
  'TV',
  'Resort',
  'Fantasy town',
  'Dream',
  'Dimension',
  'Unknown',
] as const;
export type LocationType = (typeof LOCATION_TYPES)[number] | '';

export interface ResourceItem {
  readonly id: number;
  readonly url: string;
  readonly created: string;
}

export interface ResultsList<T> {
  readonly info: {
    readonly count: number;
    readonly pages: number;
    readonly next: string | null;
    readonly prev: string | null;
  };
  readonly results: readonly T[];
}

export interface ResultsListParams {
  readonly page?: number | string;
  readonly name?: string;
  readonly status?: CharacterStatus;
  readonly species?: string;
  readonly type?: string;
  readonly gender?: CharacterGender;
  readonly dimension?: string;
}

export interface Character extends ResourceItem {
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly type: string;
  readonly gender: string;
  readonly image: string;
  readonly episode: readonly string[];
  readonly origin: { name: string; url: string };
  readonly location: { name: string; url: string };
}

export interface Episode extends ResourceItem {
  readonly name: string;
  readonly air_date: string;
  readonly episode: string;
  readonly characters: readonly string[];
  readonly displayImage?: string;
}

export interface RmLocation extends ResourceItem {
  readonly name: string;
  readonly type: LocationType;
  readonly dimension: string;
  readonly residents: readonly string[];
  readonly displayImage?: string;
}
