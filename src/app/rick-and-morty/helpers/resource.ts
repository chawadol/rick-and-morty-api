import { httpResource } from '@angular/common/http';
import { Character, Episode, ResultsList, ResultsListParams, RmLocation } from '../types';

export async function fetchResource<T>(url: string, abortSignal?: AbortSignal | null): Promise<T>;
export async function fetchResource<T>(
  url: string | null,
  abortSignal?: AbortSignal | null,
): Promise<T | null>;
export async function fetchResource<T>(
  url: string | null,
  abortSignal: AbortSignal | null = null,
): Promise<T | null> {
  if (url === null) {
    return null;
  }
  const res = await fetch(url, { signal: abortSignal, cache: 'force-cache' });
  return await res.json();
}

const entryPointURL = 'https://rickandmortyapi.com/api';

export function charactersListResource(params: () => ResultsListParams | undefined) {
  return httpResource<ResultsList<Character>>(() => {
    const p = params();
    return p
      ? {
          url: `${entryPointURL}/character`,
          params: { ...p },
        }
      : undefined;
  });
}

export function characterResource(id: () => string | number | undefined) {
  return httpResource<Character>(() => (id() ? `${entryPointURL}/character/${id()}` : undefined));
}

export function episodesListResource(params: () => ResultsListParams | undefined) {
  return httpResource<ResultsList<Episode>>(() => {
    const p = params();
    return p
      ? {
          url: `${entryPointURL}/episode`,
          params: { ...p },
        }
      : undefined;
  });
}

export function episodeResource(id: () => string | number | undefined) {
  return httpResource<Episode>(() => (id() ? `${entryPointURL}/episode/${id()}` : undefined));
}

export function locationsListResource(params: () => ResultsListParams | undefined) {
  return httpResource<ResultsList<RmLocation>>(() => {
    const p = params();
    return p
      ? {
          url: `${entryPointURL}/location`,
          params: { ...p },
        }
      : undefined;
  });
}

export function locationResource(id: () => string | number | undefined) {
  return httpResource<RmLocation>(() => (id() ? `${entryPointURL}/location/${id()}` : undefined));
}
