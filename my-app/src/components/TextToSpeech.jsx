import React, { useEffect, useState } from "react";
import { GiSpeaker } from 'react-icons/gi';
const TextToSpeech = ({ content }) => {
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  // console.log("text to sppedh",content)

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const female = availableVoices.find((voice) =>
        voice.name.toLowerCase().includes("female")
      );
      setFemaleVoice(female || availableVoices[0]); // Default to first voice if no female found
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    } else {
      fetchVoices();
    }
  }, []);

  const speak = () => {

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <span className="speak">
      {/* <button onClick={speak}>Speak</button> */}
      <GiSpeaker  onClick={speak} className="speaker"></GiSpeaker>
    </span>
  );
};

export default TextToSpeech;
