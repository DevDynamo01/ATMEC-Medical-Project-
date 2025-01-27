import logo from './logo.svg';
import './App.css';
import './App2.css';
import './Root.css';
// import VoiceWidget from "./VoiceWidget";
import Dictaphone from './components/SpeechRecognition';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import TextToSpeech from './components/TextToSpeech';
import React from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Setting from './components/Setting';
import { Route, Routes } from 'react-router-dom';
import FollowUpQuestions from './components/FollowUpQuestions';
// import Home from './components/Home';
import HomePage from './HomePage';
import DynamicForm from './DynamicForm';
import UploadFile from './components/UploadFile';
import ImageUpload from './ImageUpload';
import ReportUploader from './components/ReportUploader';
import Druggeneration from './components/Druggeneration';

import { useNavigate } from 'react-router-dom';
import DoctorsProfilePage from './DoctorsProfilePage';
import DoctorChat from './DoctorChat';
import DrugInDisease from './components/DrugInDisease';
import LoginForm from './components/Login/LoginForm';
import Game from './components/Game/Game';
import StudentQusetions from './components/Game/StudentQusetions'
import ParentQuestions from './components/Game/parentQuestions';
import PartnerQuestions from './components/Game/partnerQuestions';
import CorporateQuestions from './components/Game/corporateQuestions';
import EmojiMoodAnalyzer from './components/Game/emojiQuestions';


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="homepageChatBot" onClick={() => navigate('/chatbot')}>
        <img src="chatbot.png" />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/chatbot"
          element={
            <ChatContextProvider>
              <div className="flex transition duration-500 ease-in-out mt-[var(--marginNavBar)]">
                <SideBar />
                <ChatView />
              </div>
            </ChatContextProvider>
          }
        ></Route>
        <Route path="/diagonsis" element={<FollowUpQuestions></FollowUpQuestions>}></Route>
        <Route path="/uploadImage" element={<ImageUpload />}></Route>
        <Route path="/handle-uploader" element={<ReportUploader></ReportUploader>}></Route>
        <Route path="/generateDataFromSample" element={<UploadFile />}></Route>
        <Route path="/generateData" element={<DynamicForm />}></Route>
        <Route path="/doctors-profile" element={<DoctorsProfilePage />}></Route>
        <Route path="/doctor-chat" element={<DoctorChat />}></Route>
        <Route path="/druggenerationfromdisease" element={<DrugInDisease />}></Route>
        <Route path="/druggeneration" element={<Druggeneration />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/game" element={<Game/>}></Route>
        <Route path="/student-mood" element={<StudentQusetions/>}></Route>
        <Route path="/emoji-mood" element={<EmojiMoodAnalyzer/>}></Route>
        <Route path="/parent-mood" element={<ParentQuestions/>}></Route>
        <Route path="/partner-mood" element={<PartnerQuestions/>}></Route>
        <Route path="/corporate-mood" element={<CorporateQuestions/>}></Route>
        <Route path="/basic-mood" element={<StudentQusetions/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
