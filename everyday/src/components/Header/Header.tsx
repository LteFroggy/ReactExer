import {useNavigate} from "react-router-dom";
import './Header.css'

interface HeaderProps {
  isConnected: boolean;
}

export const Header = ({ isConnected } : HeaderProps) => {
  const navigate = useNavigate();

  return (
      <div className="header"
           style = {{ backgroundColor : isConnected ? "forestgreen" : 'red'}}>
        <button onClick={() => navigate('/')}>메인 페이지로</button>
        <button onClick={() => navigate('/react')}>React 기본 페이지로</button>
        <button onClick={() => navigate('/chat/1')}>채팅 페이지로</button>
        <button onClick={() => navigate('/socket')}>소켓 연결 페이지로</button>
        <button onClick={() => navigate('/notification')}>알림 전송 페이지로</button>
        <button onClick={() => { window.location.href = "http://" + import.meta.env.VITE_ENDPOINT }}>로그인 페이지로</button>
      </div>
  )
}