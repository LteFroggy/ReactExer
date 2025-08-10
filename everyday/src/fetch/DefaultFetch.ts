export const defaultFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    // 에러 핸들링 예: 401 Unauthorized
    console.error(`[Fetch Error] ${response.status}: ${response.statusText}`);
    throw new Error("요청 실패");
  }

  return response.json();
};