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
        <button onClick={() => navigate('/chat')}>채팅 페이지로</button>
        <button onClick={() => navigate('/settoken')}>토큰 세팅 페이지로</button>
        <button onClick={() => navigate('/socket')}>소켓 연결 페이지로</button>
        <p>소켓 연결 상태 : {isConnected ? "연결됨!" : "연결되지 않음"}</p>
      </div>
  )
}