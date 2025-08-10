import './ChatPage.css'
import {connectToChatRoom} from "../../websocket/WebSocket.ts";


export const ChatPage = () => {
  return (
      <div className='container'>
        <button className='custom-button' onClick={() => connectToChatRoom("1")}>채팅방 입장 버튼</button>
        <div className="chattingBox">
          <p>안녕하세요 여긴 채팅페이지입니다</p>
        </div>
      </div>
  );
}