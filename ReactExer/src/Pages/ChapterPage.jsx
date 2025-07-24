import Chapter1 from "../Chapter/Chapter1.jsx"
import Counter from "../Chapter/Chapter2.jsx"
import {useNavigate} from "react-router-dom";

function ChapterPage() {
  const navigate = useNavigate();

  return (
      <div>
        <h1>Chapter 1</h1>
        <Chapter1 name = "동현" age = {29} />
        <Chapter1 name = "호종" age = {28} />
        <h1>Chapter 2</h1>
        <Counter />

        <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
      </div>
  )
}

export default ChapterPage;