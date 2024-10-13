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

// import Home from './components/Home';
import HomePage from './HomePage';
function App() {
  const text = 'hello this is surya the destroyer of the world';
  return (
    <div className="App">
      <ResponsiveAppBar />
      <HomePage />
      
      {/* <Dictaphone></Dictaphone>
      <TextToSpeech content={text}></TextToSpeech> */}
      {/* <ChatContextProvider>
        <div className="flex transition duration-500 ease-in-out">
          <SideBar />
          <ChatView />
        </div>
      </ChatContextProvider> */}
      {/* <ChatContextProvider>
        <div className="flex transition duration-500 ease-in-out">
          <SideBar />
          <ChatView />
        </div>
      </ChatContextProvider> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
