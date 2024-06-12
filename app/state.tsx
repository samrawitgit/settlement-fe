import { EStatus } from "@models";
import { atom } from "recoil";

export const partyAAmountState = atom<{ amount: number; status: EStatus }>({
  key: "partyAAmount",
  default: { amount: 0, status: EStatus.PENDING },
});

export const partyBResponseState = atom<boolean>({
  key: "partyBResponse",
  default: false,
});
