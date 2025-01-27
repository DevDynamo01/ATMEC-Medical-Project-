import React, { useState } from 'react'

import './game.css';
import DisplayQuestion from './DisplayQuestion';

const CorporateQuestions = () => {
  const [answers, setAnswers] = useState({}); 
const corporateMoodQuestions = [
  {
    question: "How do you feel about your workload today?",
    options: ["😊 Manageable", "😟 Overwhelmed", "😵 Exhausted", "😐 Neutral", "😌 Relaxed"]
  },
  {
    question: "How was your experience in team collaboration this week?",
    options: ["🤝 Cooperative", "🤗 Positive", "😒 Challenging", "😔 Disappointing", "😁 Enjoyable"]
  },
  {
    question: "What’s your energy level right now?",
    options: ["💪 Energized", "☕ Caffeinated", "🥱 Sleepy", "😴 Tired", "🤩 Excited"]
  },
  {
    question: "How satisfied are you with your work-life balance?",
    options: ["😊 Satisfied", "😟 Unsatisfied", "😔 Struggling", "😎 Balanced", "🤔 Reflective"]
  },
  {
    question: "How would you rate your productivity today?",
    options: ["🔥 Excellent", "😐 Average", "🧐 Focused", "😫 Low", "💤 Unproductive"]
  },
  {
    question: "How do you feel about the current project deadlines?",
    options: ["🤩 Confident", "😓 Pressured", "😨 Stressed", "😌 Comfortable", "😒 Frustrated"]
  },
  {
    question: "How motivated are you to achieve your goals today?",
    options: ["💪 Highly motivated", "😔 Lacking motivation", "😊 Moderately motivated", "😟 Anxious", "🥱 Unmotivated"]
  },
  {
    question: "How do you feel about the support provided by your manager?",
    options: ["🤝 Supported", "🤗 Encouraged", "😟 Unsupported", "😒 Disappointed", "😁 Satisfied"]
  },
  {
    question: "How do you feel during meetings or presentations?",
    options: ["🤔 Thoughtful", "😌 Relaxed", "😫 Drained", "🧐 Engaged", "😵 Overwhelmed"]
  },
  {
    question: "How do you feel about your career progression?",
    options: ["🚀 Excited", "😔 Stagnant", "😐 Neutral", "😊 Positive", "🤔 Reflective"]
  },
  {
    question: "How do you feel about the communication in your team?",
    options: ["🤝 Collaborative", "😟 Poor", "😊 Good", "😒 Frustrating", "🤗 Encouraging"]
  },
  {
    question: "How are you coping with the company’s current expectations?",
    options: ["💪 Thriving", "😓 Struggling", "😌 Managing", "😫 Overwhelmed", "😵 Exhausted"]
  },
  {
    question: "How confident are you in the skills you’re developing at work?",
    options: ["💪 Confident", "😟 Unsure", "😊 Optimistic", "🤔 Reflective", "😐 Neutral"]
  },
  {
    question: "How relaxed do you feel after office hours?",
    options: ["😎 Relaxed", "☕ Energized", "😴 Exhausted", "😫 Drained", "😊 Content"]
  },
  {
    question: "What’s your mood about upcoming changes in the workplace?",
    options: ["🤩 Excited", "😒 Uncertain", "😊 Optimistic", "😟 Anxious", "😨 Worried"]
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
        {corporateMoodQuestions.map((element, index) => (
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

export default CorporateQuestions
