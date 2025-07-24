// useState는 컴포넌트 내에서 상태를 관리하기 위한 React 훅입니다.
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  // 회원가입 폼에서 입력 받을 데이터를 상태로 관리합니다.
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    contact: "",
    gender: "M",
    address: "",
    nickname: ""
  });

  // 입력값이 변경될 때 상태를 업데이트하는 함수입니다.
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼이 제출되었을 때 실행되는 함수입니다.
  // 서버로 회원가입 요청을 보내고 결과에 따라 알림을 띄웁니다.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST 요청을 통해 JSON 형식의 데이터를 서버로 전송합니다.
      const response = await fetch("http://localhost:8080/api/oauth/tempSigUup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
          });

      if (response.ok) {
        alert("회원가입 성공!");
        // 필요하면 페이지 이동 등 처리
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버 오류");
    }
  };

  // 실제 화면에 렌더링되는 회원가입 입력 폼입니다.
  return (
      <div>
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <input name="email" placeholder="이메일" value={form.email}
                 onChange={handleChange}/>
          {/* 비밀번호 입력 필드 */}
          <input name="password" type="password" placeholder="비밀번호"
                 value={form.password} onChange={handleChange}/>
          {/* 이름 입력 필드 */}
          <input name="name" placeholder="이름" value={form.name}
                 onChange={handleChange}/>
          {/* 연락처 입력 필드 */}
          <input name="contact" placeholder="연락처" value={form.contact}
                 onChange={handleChange}/>
          {/* 성별 선택 드롭다운 */}
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="M">남자</option>
            <option value="F">여자</option>
          </select>
          {/* 주소 입력 필드 */}
          <input name="address" placeholder="주소" value={form.address}
                 onChange={handleChange}/>
          {/* 닉네임 입력 필드 */}
          <input name="nickname" placeholder="닉네임" value={form.nickname}
                 onChange={handleChange}/>
          {/* 제출 버튼 */}
          <button type="submit">회원가입</button>
        </form>

        <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
      </div>
  );
}

export default SignupPage;