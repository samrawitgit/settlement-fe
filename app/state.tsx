import { atom } from "recoil";

export const partyAAmountState = atom<number>({
  key: "partyAAmount",
  default: 0,
});

export const partyBResponseState = atom<boolean>({
  key: "partyBResponse",
  default: false,
});
