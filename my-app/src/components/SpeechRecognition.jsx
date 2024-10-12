import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

const Dictaphone = () => {
  const [recordingText, setRecordingText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  React.useEffect(() => {
    setRecordingText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
const handleTheCall = (recordingText) => {
  console.log("recordingText");
  console.log(recordingText);
  console.log("recordingText");
};


  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <span className="mic_container">
        {/* Toggle between microphone icons based on the 'listening' state */}
        {listening ? (
          <CiMicrophoneOff
            size={40}
            onClick={()=>{
              SpeechRecognition.stopListening();
              handleTheCall(recordingText);
            }}
            style={{
              cursor: "pointer",
              border: "2px solid red", // Red border for when mic is on
              borderRadius: "50%", // Circular border
              padding: "10px",
            }}
          />
        ) : (
          <CiMicrophoneOn
            size={40}
            onClick={SpeechRecognition.startListening}
            style={{
              cursor: "pointer",
              border: "2px solid gray", // Gray border when mic is off
              borderRadius: "50%", // Circular border
              padding: "10px",
            }}
          />
        )}
        <button onClick={resetTranscript}>Reset</button>
      </span>
      <p>{transcript}</p>
      <p >Stored Transcript: {recordingText} </p> {/* Display stored string */}
    </div>
  );
};

export default Dictaphone;
