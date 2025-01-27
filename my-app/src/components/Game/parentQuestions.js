import React, { useState } from 'react'
import './game.css';

import DisplayQuestion from './DisplayQuestion';
const ParentQuestions = () => {
  const [answers, setAnswers] = useState({}); 
const parentMoodQuestions = [
  {
    question: "How do you feel about your child's progress recently?",
    options: ["😊 Proud", "😟 Concerned", "🤔 Unsure", "😔 Disappointed", "🤩 Thrilled"],
  },
  {
    question: "How do you feel about the time you get to spend with your family?",
    options: ["😌 Content", "😢 Sad", "😎 Confident", "😊 Happy", "😟 Worried"],
  },
  {
    question: "How well are you managing work and family responsibilities?",
    options: ["💪 Strong", "😔 Struggling", "😫 Overwhelmed", "😌 Balanced", "😵 Exhausted"],
  },
  {
    question: "How confident are you in supporting your child’s education?",
    options: ["🤔 Unsure", "😊 Confident", "😟 Concerned", "😒 Frustrated", "💪 Very Confident"],
  },
  {
    question: "How would you describe your energy level today?",
    options: ["💪 Energized", "☕ Caffeinated", "😴 Sleepy", "😵 Drained", "😊 Steady"],
  },
  {
    question: "How do you feel about the communication with your child's teachers?",
    options: ["🤝 Cooperative", "😊 Satisfied", "😟 Unsatisfied", "😒 Frustrated", "🤔 Unsure"],
  },
  {
    question: "How do you feel about balancing personal time and parenting responsibilities?",
    options: ["😌 Balanced", "😫 Overwhelmed", "😟 Concerned", "😎 Confident", "😊 Content"],
  },
  {
    question: "How supported do you feel by your family or community?",
    options: ["🤗 Supported", "😟 Unsupported", "😊 Encouraged", "😒 Isolated", "🤔 Neutral"],
  },
  {
    question: "How do you feel about your child's extracurricular activities?",
    options: ["🤩 Excited", "😐 Neutral", "😟 Worried", "😊 Happy", "😒 Uninterested"],
  },
  {
    question: "How do you feel about managing your household responsibilities?",
    options: ["💪 In Control", "😵 Overwhelmed", "😔 Struggling", "😊 Content", "😒 Frustrated"],
  },
  {
    question: "How relaxed do you feel at the end of the day?",
    options: ["😎 Relaxed", "😌 Peaceful", "😴 Tired", "😟 Anxious", "😫 Stressed"],
  },
  {
    question: "How do you feel about the amount of quality time spent with your child?",
    options: ["😊 Happy", "😟 Concerned", "😔 Disappointed", "🤗 Fulfilled", "😌 Content"],
  },
  {
    question: "How do you feel about your child’s screen time or use of technology?",
    options: ["🤔 Thoughtful", "😊 Satisfied", "😒 Frustrated", "😟 Worried", "😌 Neutral"],
  },
  {
    question: "How do you feel about planning for your family's future needs?",
    options: ["🚀 Optimistic", "🤔 Unsure", "😐 Neutral", "😊 Confident", "😟 Concerned"],
  },
  {
    question: "How satisfied are you with your overall parenting journey so far?",
    options: ["😊 Happy", "🤗 Fulfilled", "😔 Disappointed", "😒 Frustrated", "😌 Content"],
  },
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
        {parentMoodQuestions.map((element, index) => (
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

export default ParentQuestions
