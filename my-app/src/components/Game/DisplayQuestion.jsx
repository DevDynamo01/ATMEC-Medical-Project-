import React, { useState } from 'react';
import './game.css'

const DisplayQuestion = ({ data, onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState('');
  const [displayModel,setDisplayModel]=useState(true);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onAnswerSelected(data.question, option); 
  };

  return (
    <div className="question-container">
      <div className="question">{data.question}</div>
      <div className="options">
        {data.options.map((option, index) => (
          <span
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              cursor: 'pointer',
              padding: '8px 12px',
              margin: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '1.2rem',
              backgroundColor: selectedOption === option ? 'green' : 'white',
              color: selectedOption === option ? 'white' : 'black',
              transition: 'all 0.2s ease', // Smooth transition for hover and scale effects
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                selectedOption === option ? 'green' : 'lightgreen';
              e.currentTarget.style.transform = 'scale(1.07)'; // Slight scaling
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = selectedOption === option ? 'green' : 'white';
              e.currentTarget.style.transform = 'scale(1)'; // Reset scaling
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DisplayQuestion;
