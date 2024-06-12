import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Button, Card, Flex, InputNumber, Modal } from "antd";
import { partyAAmountState } from "@app/state";
import { getLastSettlement, submitSettlement } from "@app/apiClient";
import useWebSocket from "@hooks/useWebSockets";
import { EStatus, EWSTypes } from "@models";

export const PartyA = () => {
  const [settlement, setSettlement] = useRecoilState(partyAAmountState);
  const valueRef = useRef<HTMLInputElement>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ws = useWebSocket();

  if (ws) {
    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.type === EWSTypes.RESPONSE) {
        setRefresh(true);
      }
    };
  }

  useEffect(() => {
    getLastSettlement().then((res) => {
      setSettlement({ amount: res.amount, status: res.status });
    });
  }, []);

  const reloadPage = () => window.location.reload();

  const onClick = () => {
    // Frontend check
    if (refresh) {
      Modal.warn({
        title: "Refresh page!",
        content:
          "Party B has sent a response on your last settlement. Please refresh the page.",
        onOk: reloadPage,
        okText: "Reload",
      });
      return;
    }
    submitSettlement(Number(valueRef.current?.value), settlement.status).then(
      (res) => {
        // Backend check
        if (res.alert) {
          Modal.info({
            title: "Refresh page!",
            content: res.message,
            onOk: reloadPage,
          });
          return;
        }
        setSettlement({
          amount: Number(valueRef.current?.value),
          status: EStatus.PENDING,
        });
      }
    );
  };

  return (
    <Flex className="party partyA" vertical gap="large">
      <InputNumber
        addonAfter={"€"}
        defaultValue={settlement.amount}
        ref={valueRef}
      />
      <Button type="primary" onClick={onClick}>
        Submit
      </Button>
      <Card title="Current offer">
        <Card.Grid style={{ width: "50%" }}>€ {settlement.amount}</Card.Grid>
        <Card.Grid style={{ width: "50%", textTransform: "capitalize" }}>
          {settlement.status}
        </Card.Grid>
      </Card>
    </Flex>
  );
};
