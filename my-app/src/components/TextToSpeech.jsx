import React, { useEffect, useState } from "react";

const TextToSpeech = ({ content }) => {
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [voices, setVoices] = useState([]);

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
    if (!femaleVoice) return;

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="speak">
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
