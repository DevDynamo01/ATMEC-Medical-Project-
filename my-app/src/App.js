import logo from './logo.svg';
import './App.css';
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
import ReportUploader from './components/ReportUploader';
function App() {
  const text = 'hello this is surya the destroyer of the world';
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chatbot" element={<ChatContextProvider />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/chatbot"
          element={
            <ChatContextProvider>
              <div className="flex transition duration-500 ease-in-out">
                <SideBar />
                <ChatView />
              </div>
            </ChatContextProvider>
            }
      ></Route> 
      <Route path="/diagonsis" element={<FollowUpQuestions></FollowUpQuestions>}></Route>
      <Route path="/handle-uploader" element={<ReportUploader></ReportUploader>}></Route>
      <Route path="/generateDataFromSample" element={<UploadFile/>}></Route>
       <Route path="/generateData" element={<DynamicForm />}></Route>
     </Routes>
    </div>
  );
}

export default App;
