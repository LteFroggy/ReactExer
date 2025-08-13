import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage/MainPage.tsx";
import {ReactPage} from "../pages/ReactPage/ReactPage.tsx";
import {ChatPage} from "../pages/ChatPage/ChatPage.tsx";
import {Header} from "../components/Header/Header.tsx";
import {useState} from "react";
import {SocketPage} from "../pages/SocketPage/SocketPage.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NotificationPage} from "../pages/NotificationPage/NotificationPage.tsx";

export const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
      <BrowserRouter>
        {/* 토스트 알림을 표시하기 위한 컨테이너입니다. */}
        <ToastContainer
            position="top-right" // 알림 위치 (오른쪽 상단)
            autoClose={5000} // 5초 후 자동으로 닫힘
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Header isConnected={isConnected}/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/react' element={<ReactPage/>}/>
          <Route path='/chat/:roomId' element={<ChatPage/>}/>
          <Route path='/socket' element={<SocketPage setIsConnected={setIsConnected}/>}/>
          <Route path='/notification' element={<NotificationPage/>}/>
        </Routes>
      </BrowserRouter>
  );
};
