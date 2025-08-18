import {useState} from 'react';
import {defaultFetch} from '../../fetch/DefaultFetch';
import './NotificationPage.css';

export const NotificationPage = () => {
  const [content, setContent] = useState('');

  const handleSendNotification = async () => {
    if (!content.trim()) {
      alert('알림 내용을 입력해주세요.');
      return;
    }

    try {
      // defaultFetch를 사용하여 서버로 알림 내용을 전송합니다.
      await defaultFetch('/api/notice/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content}),
      });
      setContent(''); // 입력 필드 초기화
    } catch (error) {
      console.error('알림 전송 실패:', error);
      alert('알림 전송에 실패했습니다. 콘솔 로그를 확인해주세요.');
    }
  };

  return (
      <div className="notification-container">
        <h1>알림 전송</h1>
        <p>전체 사용자에게 보낼 알림 메시지를 입력하세요.</p>
        <div className="notification-form">
        <textarea
            className="notification-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="알림 내용을 입력하세요..."
        />
          <button onClick={handleSendNotification} className="notification-button">
            전송하기
          </button>
        </div>
      </div>
  );
};
