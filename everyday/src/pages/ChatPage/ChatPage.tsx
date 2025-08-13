import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {defaultFetch} from "../../fetch/DefaultFetch.ts";
import {sendMessage, stompClient, subscribeToChatRoom} from "../../websocket/WebSocket.ts";
import "./ChatPage.css";

interface ChatMessage {
  messageId: string;
  senderId: string;
  sender: string;
  content: string;
  timestamp?: string;
}

type Unsubscribable = { unsubscribe: () => void };

export const ChatPage = () => {
  const {roomId} = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();

  const subscriptionRef = useRef<Unsubscribable | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // message값 바뀔떄마다 최하단으로 밀기
  useEffect(() => {
    // messages가 바뀔 때마다 실행
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  useEffect(() => {

    // 방 번호 없으면 내보내기
    if (roomId == null) {
      alert("올바르지 않은 접근입니다")
      navigate(-1);
      return;
    }
    // 1. 접속 시에 소켓 열려있지 않으면, 나중에 다시 오라고 경고주고 내보내기
    if (!stompClient.connected) {
      alert("소켓이 연결되어있지 않습니다.");
      navigate(-1);
    }

    // 2. 구독까지 하기
    const subscribeRoom = async () => {
      console.log("[ChatPage] - handleSubscribe : 함수 실행됨")

      // 과거 메시지 불러오기
      const history: ChatMessage[] = await defaultFetch(`/api/chat/history/${roomId}`);
      setMessages(history);

      console.log("[ChatPage] - handleSubscribe : 과거 메세지 세팅 완료")

      // 구독
      const sub = subscribeToChatRoom(roomId, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      console.log("[ChatPage] - handleSubscribe : 구독 요청 완료")
      alert("채팅방에 연결되었습니다.")

      subscriptionRef.current = sub;
    };

    // 소켓 잘 열려 있다면, 구독까지
    subscribeRoom();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !roomId) return;
    sendMessage(roomId, newMessage);
    setNewMessage("");
  };

  return (
      <div className="Container">
        <div className="chat-page-container">
          <h2 className="chat-room-title">채팅방 #{roomId}</h2>

          <div className="chat-messages-container">
            {messages.map((msg, idx) => (
                <div key={idx} className="message-bubble">
                  <span className="message-sender">{msg.sender || "??"}:</span>
                  <span className="message-content">{msg.content}</span>
                  <span
                      className="message-timestamp"> {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}
                  </span>
                </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>

          {/* 메시지 입력 */}
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
                type="text"
                className="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <button type="submit" className="send-button">
              전송
            </button>
          </form>
        </div>
      </div>
  );
};