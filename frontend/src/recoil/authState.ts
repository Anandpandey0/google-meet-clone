import { atom } from 'recoil';

export interface UserInfo {
  username: string;
  email: string;

}

export const loggedInUserInfoState = atom<UserInfo | null>({
  key: 'loggedInUserInfoState',
  default: null,
});

export const saveUserInfoToLocalStorage = (userInfo: UserInfo | null) => {
  try {
    const userInfoJSON = JSON.stringify(userInfo);
    localStorage.setItem('userInfo', userInfoJSON);
  } catch (error) {
    console.error('Error saving userInfo to localStorage:', error);
  }
};