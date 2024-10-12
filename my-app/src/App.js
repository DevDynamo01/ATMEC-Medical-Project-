import React from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Setting from './components/Setting';
function App() {
  return (
    <div className="App">
      <ChatContextProvider>
      <div className="flex transition duration-500 ease-in-out">
        <SideBar />
        <ChatView />
      </div>
    </ChatContextProvider>
    </div>
  );
}

export default App;
