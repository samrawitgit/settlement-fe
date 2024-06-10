import { useRecoilValue } from "recoil";
import { partyBResponseState } from "@app/state";
import { PartyA } from "./PartyA";
import { PartyB } from "./PartyB";

export const Main = () => {
  const response = useRecoilValue(partyBResponseState);
  return (
    <>
      {!response ? (
        <>
          <PartyA />
          <PartyB />
        </>
      ) : (
        <>Well done, negotiation complete!</>
      )}
    </>
  );
};
