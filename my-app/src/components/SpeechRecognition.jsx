import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Dictaphone = ({ content }) => {
  // console.log("this is the content",content);
  const [recordingText, setRecordingText] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  React.useEffect(() => {
    setRecordingText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  // const handleTheCall = (recordingText) => {
  //   console.log('recordingText', recordingText);
  //   content(recordingText);
  //   console.log(recordingText);
  //   // console.log("recordingText");
  // };
  // const [toggle,setToggle]=useState(false)

  useEffect(() => {
    if (listening == false) {
      handleTheCall();
    }
  }, [listening]);

  const handleTheCall = () => {
    console.log('we get recording');
    console.log('recording text :', recordingText);
    if (recordingText) {
      content(recordingText);
    }
  };

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <span className="mic_container">
        {/* Toggle between microphone icons based on the 'listening' state */}
        {listening ? (
          <CiMicrophoneOff
            size={30}
            onClick={() => {
              // handleTheCall(recordingText);
              // console.log("hbfsnm")
              SpeechRecognition.stopListening();
            }}
            style={{
              cursor: 'pointer',
              border: '2px solid red', // Red border for when mic is on
              borderRadius: '50%', // Circular border
              padding: '10px',
            }}
          />
        ) : (
          <CiMicrophoneOn
            size={30}
            onClick={() => {
              // setRecordingText("");
              resetTranscript();
              SpeechRecognition.startListening();
            }}
            style={{
              cursor: 'pointer',
              border: '2px solid gray', // Gray border when mic is off
              borderRadius: '50%', // Circular border
              padding: '10px',
              scale: '1.7',
            }}
          />
        )}
        {/* <button onClick={resetTranscript}>Reset</button> */}
      </span>
      {/* <p>{transcript}</p>
      <p >Stored Transcript: {recordingText} </p> Display stored string */}
    </div>
  );
};

export default Dictaphone;
