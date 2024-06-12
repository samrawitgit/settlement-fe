import { EStatus } from "@models";

export const submitSettlement = async (amount: number, status: string) => {
  const response = await fetch(
    `${process.env.backend_url}/api/settlements/add-new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        status: EStatus.PENDING,
        checkPrev: status === "pending" ? 1 : 0,
      }),
    }
  );

  return response.json();
};

export const getLastSettlement = async () => {
  const response = await fetch(
    `${process.env.backend_url}/api/settlements/get-last`
  );

  return response.json();
};

export const sendResponse = async (
  settlementId: number | string,
  response: boolean
) => {
  const res = await fetch(`${process.env.backend_url}/api/responses/add-new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ settlementId, response: response ? 1 : 0 }),
  });

  return res.json();
};
