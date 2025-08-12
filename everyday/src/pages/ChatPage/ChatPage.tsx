import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {defaultFetch} from "../../fetch/DefaultFetch.ts";
import {activateStompClient, sendMessage, subscribeToChatRoom} from "../../websocket/WebSocket.ts";
import "./ChatPage.css";

interface ChatMessage {
  messageId: string;
  senderId: string;
  sender: string;
  content: string;
  timestamp?: string;
}

type Unsubscribable = { unsubscribe: () => void };

export const ChatPage = (message?: any) => {
  const {roomId} = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const subscriptionRef = useRef<Unsubscribable | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // messages가 바뀔 때마다 실행
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  // 1. 소켓 CONNECT
  const handleConnect = async () => {
    try {
      await activateStompClient();
      setConnected(true);
      console.log("소켓 연결 성공");
      alert("소켓 연결됨!")
    } catch (err) {
      alert("소켓 연결 실패!" + err)
      console.error("소켓 연결 실패", err);
    }
  };

  // 2. SUBSCRIBE
  const handleSubscribe = async () => {
    if (!connected || !roomId) return;

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
    setSubscribed(true);
  };

  // 3. UNSUBSCRIBE
  const handleUnsubscribe = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
      setSubscribed(false);
      console.log("구독 취소 완료");
    }
  };

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

          {/* 버튼 3개 */}
          <div style={{marginBottom: "10px"}}>
            <button onClick={handleConnect} disabled={connected}>
              소켓 CONNECT
            </button>
            <button onClick={handleSubscribe} disabled={!connected || subscribed}>
              채팅방 연결
            </button>
          </div>

          <div className="chat-messages-container">
            {messages.map((msg, idx) => (
                <div key={idx} className="message-bubble">
                  <span className="message-sender">{msg.sender || "??"}:</span>
                  <span className="message-content">{msg.content}</span>
                  <span className="message-timestamp"> {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}
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