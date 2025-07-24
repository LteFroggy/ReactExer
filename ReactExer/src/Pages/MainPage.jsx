import {useNavigate} from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
      <div>
        <button onClick={() => navigate("/chapter")}>챕터 페이지로 이동하기</button>
        <button onClick={() => navigate("/signup")}>사인업 페이지로 이동하기</button>
      </div>
  )
}

export default MainPage;