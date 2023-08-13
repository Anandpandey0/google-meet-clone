import { atom } from "recoil";

export const roomParticipantsState = atom({
  key: "roomParticipantsState",
  default: [], // Initial value should be an empty array
});
