import React, { useState } from 'react';
import './game.css';

const EmojiMoodAnalyzer = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [result, setResult] = useState('');
  const [displayModel,setDisplayModel]=useState(false);

  const emojis = [
    { emoji: '😊', category: 'positive' },
    { emoji: '🤩', category: 'positive' },
    { emoji: '😌', category: 'positive' },
    { emoji: '🤗', category: 'positive' },
    { emoji: '💪', category: 'positive' },
    { emoji: '🥳', category: 'positive' },
    { emoji: '😎', category: 'positive' },
    { emoji: '🎉', category: 'positive' },
    { emoji: '🌞', category: 'positive' },
    { emoji: '🌟', category: 'positive' },
    { emoji: '😔', category: 'negative' },
    { emoji: '😢', category: 'negative' },
    { emoji: '😠', category: 'negative' },
    { emoji: '😫', category: 'negative' },
    { emoji: '😞', category: 'negative' },
    { emoji: '😓', category: 'negative' },
    { emoji: '😡', category: 'negative' },
    { emoji: '😭', category: 'negative' },
    { emoji: '😟', category: 'negative' },
    { emoji: '😒', category: 'negative' },
    { emoji: '😵‍💫', category: 'stressed' },
    { emoji: '😓', category: 'stressed' },
    { emoji: '🤯', category: 'stressed' },
    { emoji: '🥵', category: 'stressed' },
    { emoji: '😨', category: 'stressed' },
    { emoji: '😩', category: 'stressed' },
    { emoji: '🫠', category: 'stressed' },
    { emoji: '😰', category: 'stressed' },
    { emoji: '🧠', category: 'stressed' },
    { emoji: '💭', category: 'stressed' },
    { emoji: '🙄', category: 'frustrated' },
    { emoji: '😤', category: 'frustrated' },
    { emoji: '🤨', category: 'frustrated' },
    { emoji: '😑', category: 'frustrated' },
    { emoji: '🤬', category: 'frustrated' },
    { emoji: '😖', category: 'frustrated' },
    { emoji: '😣', category: 'frustrated' },
    { emoji: '😕', category: 'frustrated' },
    { emoji: '👿', category: 'frustrated' },
    { emoji: '😡', category: 'frustrated' },
    { emoji: '🤩', category: 'excited' },
    { emoji: '🥳', category: 'excited' },
    { emoji: '🏆', category: 'excited' },
    { emoji: '🎊', category: 'excited' },
    { emoji: '🚀', category: 'excited' },
    { emoji: '🌿', category: 'calm' },
    { emoji: '🌅', category: 'calm' },
    { emoji: '🛋️', category: 'calm' },
    { emoji: '😌', category: 'calm' },
    { emoji: '🌙', category: 'calm' },
  ];

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else if (selectedEmojis.length < 10) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const analyzeMood = () => {
    const moodCount = {
      positive: 0,
      negative: 0,
      stressed: 0,
      frustrated: 0,
      excited: 0,
      calm: 0,
    };

    selectedEmojis.forEach((emoji) => {
      const category = emojis.find((e) => e.emoji === emoji)?.category;
      if (category) moodCount[category]++;
    });

    const dominantMood = Object.keys(moodCount).reduce((a, b) =>
      moodCount[a] > moodCount[b] ? a : b,
    );

    let message = '';
    let suggestion = '';

    switch (dominantMood) {
      case 'positive':
        message = 'You are feeling positive and happy! 😊';
        suggestion =
          'Keep up the good mood! Consider sharing your happiness with others or treating yourself to something you enjoy.';
        break;

      case 'negative':
        message = 'You are feeling negative or upset. 😔';
        suggestion =
          'Take a moment to reflect on what’s bothering you. Try journaling your thoughts, talking to a trusted friend, or going for a short walk.';
        break;

      case 'stressed':
        message = 'You are feeling stressed or anxious. 😓';
        suggestion =
          'Consider practicing deep breathing or meditation. A short break or listening to calming music might help reduce stress.';
        break;

      case 'frustrated':
        message = 'You are feeling frustrated or annoyed. 😤';
        suggestion =
          'Try stepping away from the source of frustration and engaging in a relaxing activity, such as reading, exercising, or taking a warm shower.';
        break;

      case 'excited':
        message = 'You are feeling excited and energetic! 🤩';
        suggestion =
          'Channel your excitement into something productive, like starting a new project or sharing your energy with friends and loved ones.';
        break;

      case 'calm':
        message = 'You are feeling calm and relaxed. 😌';
        suggestion =
          'Enjoy the serenity! Consider activities that nurture this state, like yoga, meditation, or spending time in nature.';
        break;

      default:
        message = 'Your mood seems balanced. 🤔';
        suggestion =
          'Maintain this balance by engaging in activities that bring you joy and fulfillment, such as hobbies, connecting with loved ones, or simply resting.';
        break;
    }
    setResult({ message, suggestion });
    setDisplayModel(true);
  };

  return (
    <div className="game-container">
      {displayModel && (
        <div className="result">
          <div>{result.message}</div>
          <br></br>
          <div>{result.suggestion}</div>
          <div>
            <button
              className="closebtn"
              onClick={() => {
                setResult('');
                setSelectedEmojis([]);
                setDisplayModel(false)
              }}
            >
              {' '}
              CLOSE
            </button>
          </div>
        </div>
      )}
      {!displayModel && (
        <div className="emoji-analyzer-container">
          <h1 className="title">Select Emojis That Match Your Mood</h1>
          <div className="emoji-grid">
            {emojis.map((item, index) => (
              <button
                key={index}
                className={`emoji-button ${selectedEmojis.includes(item.emoji) ? 'selected' : ''}`}
                onClick={() => handleEmojiClick(item.emoji)}
              >
                {item.emoji}
              </button>
            ))}
          </div>
          <button
            onClick={analyzeMood}
            className="analyze-button"
            disabled={selectedEmojis.length < 1}
          >
            Analyze Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiMoodAnalyzer;
