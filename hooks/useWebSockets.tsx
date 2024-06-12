import { useState, useEffect } from "react";

export default function useWebSocket(url: string = "ws://localhost:8081") {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WS");

      setSocket(ws);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
}
