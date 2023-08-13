import { atom } from 'recoil';
import Peer from 'peerjs'

export const userPeerInfoState = atom<Peer | null>({
  key: 'userPeerInfoState',
  default: null,
});