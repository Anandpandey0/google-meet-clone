import { atom } from 'recoil';

export interface UserInfo {
  username: string;
  email: string;

}

export const loggedInUserInfoState = atom<UserInfo | null>({
  key: 'loggedInUserInfoState',
  default: null,
});

