import { Routes, Route } from 'react-router-dom'
import ChapterPage from './Pages/ChapterPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import MainPage from './Pages/MainPage.jsx'

function App() {
  return (
      <Routes>
        <Route path = "/" element={<MainPage />} />
        <Route path = "/chapter" element={<ChapterPage />} />
        <Route path = "/signup" element = {<SignupPage />} />
      </Routes>
  );
}

export default App;