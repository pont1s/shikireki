import { Images } from '@/services/@types/common';

export interface StudioApi {
  id: number;
  name?: string;
  filteredName?: string;
  image?: string;
  real?: boolean;
}

export interface GenreApi {
  id: number;
  kind?: string;
  name?: string;
  nameRussian?: string;
}

export interface RateScoresStatApi {
  name: number;
  value: number;
}

export interface RateStatusesStatApi {
  name: 'Запланировано' | 'Просмотрено' | 'Смотрю' | 'Брошено' | 'Отложено';
  value: number;
}

export interface SeyuApi {
  externalId: number;
  name: string;
  nameRussian: string;
  images: Images;
  url: string;
}

export interface CharacterApi {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  url: string;
  seyus: SeyuApi[];
}

export enum RoleEnumApi {
  'Original Creator' = 'Автор оригинала',
  'Director' = 'Режиссёр',
}

export interface RoleApi {
  name: string;
  nameRussian: string;
}

export interface PersonApi {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  roles: RoleApi[];
}

export interface AnimeApi {
  _id: string;
  externalId: number;
  url: string;
  score: number;
  rating: string; // возрастной рейтинг
  name?: string;
  nameRussian?: string;
  namesEnglish?: Array<string>;
  namesJapanese?: Array<string>;
  synonyms?: Array<string>;
  airedOn?: string;
  releasedOn?: string;
  kind?: string; // tv | ova | film ...
  description?: string;
  status?: string;
  franchise?: string;
  studios: Array<StudioApi>;
  genres: Array<GenreApi>;
  images: Images;
  duration: number;
  episodes: number;
  episodesAired: number;
  nextEpisodeAt?: string;
  favoured: boolean;
  anons: boolean;
  ongoing: boolean;
  ratesScoresStats: Array<RateScoresStatApi>;
  ratesStatusesStats: Array<RateStatusesStatApi>;
  characters: Array<CharacterApi>;
  persons: Array<PersonApi>;
}

export interface RateApi {
  id: number;
  user_id: number;
  target_type: 'Anime';
  target_id: number;
  status: 'completed';
  episodes: number;
  chapters: number;
  volumes: number;
  rewatches: number;
  score: number;
  text: string;
  text_html: string;
  created_at: Date;
  updated_at: Date;
}

export const KindApi: { [key: string]: string } = {
  tv: 'TV сериал',
  ona: 'ONA',
  ova: 'OVA',
  special: 'Special',
  movie: 'Фильм',
  tv_13: 'TV сериал',
  tv_24: 'TV сериал',
  tv_48: 'TV сериал',
};

export const RatingApi: { [key: string]: string } = {
  g: 'G',
  pg: 'PG',
  pg_13: 'PG-13',
  r: 'R-17',
  r_plus: 'R+',
  rx: 'Rx',
};

export const StatusApi: { [key: string]: string } = {
  anons: 'анонсировано',
  ongoing: 'выходит',
  released: 'вышло',
};
