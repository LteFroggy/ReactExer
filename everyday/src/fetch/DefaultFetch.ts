export const defaultFetch = async (url: string, options: RequestInit = {}) => {
  console.log("[defaultFetch] : 패치 실행")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  console.log("[defaultFetch] : 헤더 설정 완료")

  const response = await fetch("http://" + import.meta.env.VITE_ENDPOINT + url, {
    // 쿠키 포함
    credentials: 'include',
    ...options,
    headers
  });

  console.log("[defaultFetch] : 요청 완료, 결과는 " + response.statusText);

  if (!response.ok) {
    // 에러 핸들링 예: 401 Unauthorized
    console.error(`[Default Fetch] : 에러 발생 ${response.status}: ${response.statusText}`);
    throw new Error("요청 실패");
  }

  return response.json();
};