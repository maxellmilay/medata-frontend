import { StatusInterface } from './StatusInterface';

export type MediaItemType = MediaInfoType & {
  id: string;
};

export type ToggleModalType = {
  toggleModal: () => void;
};

export interface MediaInfoType extends StatusInterface {
  title: string;
  owner: string;
  type: string;
  synopsis: string;
  photoURL: string;
  email: string
}

export interface StatusNumbers {
  total: number;
  inProgress: number;
  completed: number;
  toExpore: number;
  dropeed: number;
}
