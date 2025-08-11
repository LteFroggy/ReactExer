import {activateStompClient} from "../../websocket/WebSocket.ts";
import './SocketPage.css';
import {stompClient} from "../../websocket/WebSocket.ts";

interface SocketPageProps {
  setIsConnected: (isConnected: boolean) => void;
}

export const SocketPage = ({ setIsConnected }: SocketPageProps) => {

  const handleConnect = async () => {
    try {
      await activateStompClient();
      if (stompClient.connected) {
        setIsConnected(true);
        alert("웹소켓 연결에 성공했습니다!");
      }
    } catch (error) {
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
