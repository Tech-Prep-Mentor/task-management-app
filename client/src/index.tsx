import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import LandingPage from './LandingPage';
import QuizGenerator from './pages/QuizGenerator';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import ChatPage from './pages/Chat';
import { UserContextProvider } from './context/userContext';
import { useUser } from './context/userContext';
import AiTutor from './pages/AiTutor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const RequireAuth = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<RequireAuth />}>
            {' '}
            {/* Wrap protected routes */}
            <Route path="/aitutor/chatbot/" element={<Chatbot />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/aitutor" element={<AiTutor />} />
            <Route path="/aitutor/quiz" element={<QuizGenerator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
);
