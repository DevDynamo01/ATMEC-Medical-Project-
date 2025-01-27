import React, { useState } from 'react'
import './game.css';

import DisplayQuestion from './DisplayQuestion';

const PartnerQuestions = () => {
    const [answers, setAnswers] = useState({}); 
  
const spouseMoodQuestions = [
  {
    question: "How do you feel about the time you spend together with your partner?",
    options: ["😊 Happy", "😟 Concerned", "🤔 Reflective", "😔 Sad", "🤩 Excited"]
  },
  {
    question: "How supported do you feel by your partner in daily life?",
    options: ["🤗 Supported", "😟 Unsupported", "😊 Content", "😒 Frustrated", "💪 Empowered"]
  },
  {
    question: "How would you describe your overall mood today?",
    options: ["😊 Happy", "😌 Relaxed", "😟 Worried", "😵 Overwhelmed", "😴 Tired"]
  },
  {
    question: "How do you feel about how household responsibilities are divided?",
    options: ["🤝 Cooperative", "😊 Satisfied", "😟 Unbalanced", "😫 Overburdened", "🤔 Thoughtful"]
  },
  {
    question: "How do you feel about the communication between you and your partner?",
    options: ["😊 Open", "🤔 Reflective", "😒 Dissatisfied", "🤗 Positive", "😟 Troubled"]
  },
  {
    question: "How satisfied are you with your work-life balance?",
    options: ["😊 Satisfied", "😟 Dissatisfied", "😵 Overwhelmed", "😴 Drained", "💪 Balanced"]
  },
  {
    question: "How do you feel about the time you spend on personal hobbies or self-care?",
    options: ["😊 Fulfilled", "😔 Neglected", "🤔 Considering", "😌 Relaxed", "😒 Discontent"]
  },
  {
    question: "How do you feel about planning for the future with your partner?",
    options: ["🚀 Excited", "😊 Optimistic", "😟 Anxious", "🤔 Unsure", "😒 Pessimistic"]
  },
  {
    question: "How do you feel about the romantic connection in your relationship?",
    options: ["🤩 Thrilled", "😊 Content", "😔 Lacking", "😟 Concerned", "🤔 Reflective"]
  },
  {
    question: "How relaxed do you feel at the end of the day with your partner?",
    options: ["😌 Relaxed", "😊 Content", "😴 Exhausted", "😒 Frustrated", "😫 Drained"]
  },
  {
    question: "How do you feel about the time spent discussing important issues with your partner?",
    options: ["🤝 Productive", "😊 Positive", "😟 Limited", "😒 Unproductive", "🤔 Reflective"]
  },
  {
    question: "How appreciated do you feel by your partner in your relationship?",
    options: ["🤗 Valued", "😊 Grateful", "😟 Undervalued", "😒 Overlooked", "🤔 Unsure"]
  },
  {
    question: "How do you feel about the emotional connection in your relationship?",
    options: ["😊 Fulfilled", "🤩 Strong", "😔 Lacking", "😟 Concerned", "🤔 Reflective"]
  },
  {
    question: "How do you feel about your partner’s support during stressful times?",
    options: ["💪 Supported", "😊 Reassured", "😟 Unsupported", "😒 Disheartened", "😌 Calmed"]
  },
  {
    question: "How do you feel about the overall balance between love and responsibilities in your relationship?",
    options: ["😊 Balanced", "🤗 Nurturing", "😒 Imbalanced", "😟 Troubled", "😌 Satisfied"]
  }
];


  const handleAnswerSelected = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log('User Answers:', answers);
    
  };

  return (
    <div className="game-container">
      <div className="header">
        Knowing your current level of stress is the first step in taking control
      </div>
      <div className="question-set">
        {spouseMoodQuestions.map((element, index) => (
          <DisplayQuestion key={index} data={element} onAnswerSelected={handleAnswerSelected} />
        ))}
      </div>
      <button
        onClick={handleSubmit}
      >
        Submit Answers
      </button>
    </div>
  )
}

export default PartnerQuestions
