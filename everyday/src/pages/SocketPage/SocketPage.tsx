import {
  activateStompClient,
  stompClient,
  subscribeNotification
} from "../../websocket/WebSocket.ts";
import './SocketPage.css';
import {defaultFetch} from "../../fetch/DefaultFetch.ts";

interface SocketPageProps {
  setIsConnected: (isConnected: boolean) => void;
}

export const SocketPage = ({setIsConnected}: SocketPageProps) => {

  const handleConnect = async () => {
    try {
      // 1. 웹소켓 연결을 활성화합니다.
      // activateStompClient는 Promise를 반환하므로, await을 사용해 연결이 완료될 때까지 기다립니다.
      await activateStompClient();

      // 2. 연결이 성공적으로 이루어졌는지 stompClient.connected 상태로 확인합니다.
      if (stompClient.connected) {
        setIsConnected(true); // App의 상태를 업데이트하여 헤더 등에 연결 상태를 반영합니다.
        alert("웹소켓 연결에 성공했습니다!");

        // 3. 연결 성공 후, 바로 알림 구독을 시작합니다.
        // WebSocket.ts에 정의한 subscribeNotification 함수를 호출합니다.
        // 해당 함수는 개인 알림 구독에 더불어, 팀 채널을 구독해 메세지를 전송받습니다.

        // Fetch를 통해 내가 가입한 팀 리스트를 받습니다.
        const res = await defaultFetch("/api/teams/getlist")
        console.log(res.teamList);
        // 구독을 진행합니다.
        subscribeNotification(res.teamList);
      }

    } catch (error) {
      // 연결 과정에서 에러가 발생하면 이곳에서 처리합니다.
      console.error("웹소켓 연결 시도 중 에러 발생:", error);
      setIsConnected(false);
      alert("웹소켓 연결에 실패했습니다. 콘솔 로그를 확인해주세요.");
    }
  };

  return (
      <div className="socket-container">
        <h1>WebSocket 연결</h1>
        <p>아래 버튼을 클릭하여 웹소켓 서버에 연결하세요.</p>
        <button onClick={handleConnect} className="connect-button">
          연결하기
        </button>
      </div>
  );
};
