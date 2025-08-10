import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage/MainPage.tsx";
import {ReactPage} from "../pages/ReactPage/ReactPage.tsx";
import {ChatPage} from "../pages/ChatPage/ChatPage.tsx";
import {Header} from "../components/Header/Header.tsx";
import {SetTokenPage} from "../pages/SetTokenPage/SetTokenPage.tsx";
import {useState} from "react";
import {SocketPage} from "../pages/SocketPage/SocketPage.tsx";

export const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <BrowserRouter>
      <Header isConnected={isConnected} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/react' element={<ReactPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/settoken' element={<SetTokenPage />} />
        <Route path='/socket' element={<SocketPage setIsConnected={setIsConnected} />} />
      </Routes>
    </BrowserRouter>
  );
};