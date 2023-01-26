import { BirdiUserSighting } from './DbApiTypes';
import { EBird } from './EBirdTypes';

export interface ActiveCardProps {
  bird: EBird | BirdiUserSighting;
  profile: boolean | null;
  setClicked?: function
}

export interface CardState {
  info: string;
  imgUrl: string;
}