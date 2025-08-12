import {useState} from "react";
import './SetToken.css'
import {getCookie, setCookie} from "../../utils/cookie.ts";

export const SetTokenPage = () => {

  const [formData, setFormData] = useState({
    accessToken: "",
    refreshToken: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name] : value}));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCookie("accessToken", formData.accessToken, 1);
    setCookie("refreshToken", formData.refreshToken, 7);
    alert("저장 완료!");
  }

  const checkToken = () => {
    alert("현재 AccessToken : " + getCookie("accessToken") + ", RefreshToken : " + getCookie("refreshToken"));
  }


  return (
      <div className='container'>
        <form onSubmit={handleSubmit} className='tokenForm'>
          <div>
            <span>엑세스 토큰 :    </span>
            <input
                type = "text"
                name = "accessToken"
                value={formData.accessToken}
                placeholder="엑세스토큰"
                onChange={handleChange}/>
          </div>
          <div>
            <span>리프레시 토큰 :   </span>
            <input
                type = "text"
                name = "refreshToken"
                value={formData.refreshToken}
                placeholder="리프레시토큰"
                onChange={handleChange}/>
          </div>
          <button type="submit" className='custom-button'>등록</button>
        </form>
        <p></p>
        <div>
          <button onClick={() => checkToken()} className='custom-button'>토큰 체크하기</button>
        </div>
      </div>
  )
}
