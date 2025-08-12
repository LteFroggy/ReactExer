import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
  webSocketFactory: () =>
      new WebSocket("ws://" + import.meta.env.VITE_ENDPOINT + "/ws"), // 순수 WebSocket 사용
  debug: (str) => console.log(str),
  reconnectDelay: 10000,
  onConnect: () => {
    console.log("웹소켓 연결 완료!");
  },
});

export const activateStompClient = () => {
  return new Promise<void>((resolve, reject) => {

    stompClient.configure({

      onConnect: () => {
        console.log("웹소켓 연결 완료!");
        resolve();
      },

      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        reject(new Error(frame.headers["message"]));
      },
    });

    if (!stompClient.active) {
      stompClient.activate();
    }
  });
};

export const subscribeToChatRoom = (roomId: string, onMessageReceived: (message: any) => void) => {
  return stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
    console.log('메세지 수신 : ', message.body);
    onMessageReceived(JSON.parse(message.body));
  });
};

export const sendMessage = (roomId: string, content: string) => {
  const message = {
    roomId: roomId,
    content: content,
  };

  stompClient.publish({
    destination: `/app/chat/${roomId}`,
    body: JSON.stringify(message),
  });
};


export const connectToChatRoom = (roomId : string) => {
  stompClient.subscribe(`/topic/room/` + roomId, (message) => {
    console.log('메세지 수신 : ', message.body);
  });
}