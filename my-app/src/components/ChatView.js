import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend, MdLightbulbOutline } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from './Modal';
import Setting from './Setting';
import PromptPerfect from './PromptPerfect';
import Dictaphone from './SpeechRecognition';
import axios from 'axios';
import ImagePreview from './ImagePreview';
import useImageUpload from '../hooks/useImageUpload';
import DataContext from '../context/dataContext';
import Loading from '../components/LoadingSpinner/Loading';
/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, addMessage] = useContext(ChatContext);
  const { loadingChat, setLoadingChat, file, setFile, setFileDataURL } = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const { url, uploadImage } = useImageUpload();
  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false, imageLink = '') => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      imageLink: imageLink,
    };
    addMessage(newMsg);
  };

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) return;
    const cleanPrompt = formValue.trim();

    const newMsg = cleanPrompt;
    let imageUrl = '';
    setFormValue('');
    if (file) {
      console.log('Image is going to upload');
      // const response=await axios.post("url to upload image");
      // const imageurl=response?.image_url;
      const image = await uploadImage(file);
      imageUrl = image;
      console.log('Image Url', image);
      updateMessage(newMsg, false, image);
    } else {
      updateMessage(newMsg, false);
    }
    setFile(null);
    setFileDataURL(null);
    ChatWithBackend(newMsg, imageUrl);
    console.log('************************************ now the button is clicked');
    const response = 'I am a bot. This feature will be coming soon.';
    // console.log(responseMessage.data);
    // updateMessage(responseMessage?.data, true);
  };
  async function ChatWithBackend(data, imageUrl) {
    try {
      setLoadingChat(true);
      console.log('current data', data);
      const response = await axios.post(API_URL + '/chat', { message: data, image: imageUrl });
      console.log('this is reposen from api', response?.data);
      // setResponseMessage(response?.data);
      setLoadingChat(false);
      updateMessage(response?.data?.data, true);
    } catch (err) {
      console.log(err);
      setLoadingChat(false);
    }
  }
  const sendMessageForMic = async (text) => {
    console.log('send msg funtion called for miccalled for ', text);
    const cleanPrompt = text;
    const newMsg = cleanPrompt;
    updateMessage(newMsg, false);
    ChatWithBackend(newMsg);
    // console.log("")
    // const response = 'I am a bot. This feature will be coming soon.';
    // console.log(responseMessage);
    // updateMessage(responseMessage, true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 👇 Get input value
      sendMessage(e);
      inputRef.current.style.height = 'auto';
    }
  };

  const handleChangeforMic = (text) => {
    console.log('text', text);
    setFormValue(text);
  };
  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  const updatePrompt = async () => {
    console.log('-----------------------------------');
    // const api = 'https://us-central1-prompt-ops.cloudfunctions.net/optimize';
    // const secretKey = process.env.REACT_APP_API_KEY;

    // try {
    //   setLoading(true);
    //   const response = await fetch(api, {
    //     headers: {
    //       'x-api-key': token ${secretKey},
    //       'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         prompt: formValue.trim(),
    //         targetModel: 'chatgpt',
    //       },
    //     }),
    //     method: 'POST',
    //   });
    //   if (!response.ok) {
    //     throw new Error('Request failed');
    //   }

    //   const responseData = await response.json();
    //   setPrompt(responseData.result.promptOptimized);
    //   setLoading(false);
    //   setModalPromptOpen(true);
    // } catch (e) {
    //   console.error(e);
    //   setLoading(false);
    // }
  };

  const handleUseClicked = () => {
    console.log('me clicked');
    setFormValue(prompt);
    setModalPromptOpen(false);
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }, [formValue]);
  return (
    <div className=" w-full chat-section-main  bg-white  flex flex-col  duration-300 relative">
      {loadingChat && <Loading></Loading>}
      <main className="chatview__chatarea gap-3">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="form bg-[--lightBlueColor]" onSubmit={sendMessage}>
        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            rows={1}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <div className="flex gap-2 items-center">
            <button type="submit" className="chatview__btn-send my-auto" disabled={!formValue}>
              <MdSend size={30} />
            </button>
            <Dictaphone content={sendMessageForMic} />
            <ImagePreview></ImagePreview>
          </div>
        </div>
      </form>
      {/* <Modal title="Prompt Perfect" modalOpen={modalPromptOpen} setModalOpen={setModalPromptOpen}>
        <PromptPerfect
          prompt={prompt}
          onChange={setPrompt}
          onCancelClicked={() => setModalPromptOpen(false)}
          onUseClicked={handleUseClicked}
        />
      </Modal> */}
    </div>
  );
};

export default ChatView;
