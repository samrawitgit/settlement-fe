import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Button, Card, Flex, InputNumber } from "antd";
import { partyAAmountState } from "@app/state";
import { getLastSettlement, submitSettlement } from "@app/apiClient";

export const PartyA = () => {
  const [amount, setAmount] = useRecoilState(partyAAmountState);
  const [currentRespose, setCurrentResponse] = useState({
    amount: null,
    settlementId: null,
    status: null,
  });
  const valueRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getLastSettlement().then((res) => {
      setCurrentResponse(res);
    });
  }, []);

  const onClick = () => {
    submitSettlement(Number(valueRef.current?.value)).then((res) => {
      setAmount(Number(valueRef.current?.value));
    });
  };

  return (
    <Flex className="party partyA" vertical gap="large">
      <InputNumber addonAfter={"€"} defaultValue={amount} ref={valueRef} />
      <Button type="primary" onClick={onClick}>
        Submit
      </Button>
      <Card title="Current offer">
        <Card.Grid style={{ width: "50%" }}>
          € {currentRespose?.amount}
        </Card.Grid>
        <Card.Grid style={{ width: "50%", textTransform: "capitalize" }}>
          {currentRespose.status}
        </Card.Grid>
      </Card>
    </Flex>
  );
};
