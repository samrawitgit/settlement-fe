import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Card, Flex, Modal } from "antd";
import { partyBResponseState } from "@app/state";
import { getLastSettlement, sendResponse } from "@app/apiClient";

export const PartyB = () => {
  const setResponse = useSetRecoilState(partyBResponseState);
  const [currentValue, setCurrentValue] = useState({
    amount: null,
    settlementId: null,
  });

  useEffect(() => {
    getLastSettlement().then((res) => {
      setCurrentValue(res);
    });
  }, []);

  const onSettle = () => {
    sendResponse(currentValue.settlementId, true).then((res) => {
      if (res.error) {
        Modal.error({
          title: "Response error",
          content: res.message,
        });
        return;
      }
      setResponse(true);
    });
  };

  const onDispute = () => {
    sendResponse(currentValue.settlementId, false).then((res) => {
      if (res.error) {
        Modal.error({
          title: "Response error",
          content: res.message,
        });
        return;
      }
      setResponse(false);
    });
  };

  return (
    <Flex className="party partyB" vertical gap="large">
      <Card size="small" title="Party A offer">
        {currentValue?.amount}
      </Card>
      <Flex gap="large">
        <Button onClick={onSettle} size="large">
          Settle
        </Button>
        <Button onClick={onDispute} type="primary" size="large">
          Dispute
        </Button>
      </Flex>
    </Flex>
  );
};
