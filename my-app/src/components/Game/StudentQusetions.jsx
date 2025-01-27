import React, { useState } from 'react';
import './game.css';
import DisplayQuestion from './DisplayQuestion';

const StudentQuestions = () => {
  const [answers, setAnswers] = useState({}); 

const studentMoodQuestions = [
  {
    question: 'How are you feeling right now?',
    options: ['😊 Happy', '😔 Sad', '😡 Angry', '😵 Overwhelmed', '😎 Confident'],
  },
  {
    question: 'How do you feel about today’s schedule?',
    options: ['🕺 Excited', '😐 Neutral', '😓 Anxious', '😴 Exhausted'],
  },
  {
    question: 'What best describes your morning routine?',
    options: ['🌞 Productive', '☕ Lazy', '😵 Rushed', '😴 Sleepy'],
  },
  {
    question: 'How do you usually feel during class?',
    options: ['🧐 Focused', '😴 Bored', '🤔 Confused', '😁 Engaged'],
  },
  {
    question: 'How do you feel after studying for a long time?',
    options: ['😌 Satisfied', '😫 Tired', '😵 Stressed', '🥱 Uninterested'],
  },
  {
    question: 'What’s your go-to way of dealing with stress?',
    options: ['🎧 Music', '🏃 Exercise', '😴 Sleep', '🤝 Talking'],
  },
  {
    question: 'How do you feel about group projects?',
    options: ['😍 Excited', '🤨 Skeptical', '😡 Frustrated', '😎 Confident'],
  },
  {
    question: 'How do you feel before exams?',
    options: ['😨 Nervous', '📖 Prepared', '😵 Overwhelmed', '😌 Calm'],
  },
  {
    question: 'What’s your mood during a tough assignment?',
    options: ['😟 Stressed', '😌 Determined', '😔 Helpless', '🤔 Curious'],
  },
  {
    question: 'How do you feel when learning something new?',
    options: ['🤓 Interested', '😅 Confused', '😒 Frustrated', '🤩 Excited'],
  },
  {
    question: 'How do you feel about homework?',
    options: ['😎 Easy', '😕 Confusing', '😓 Overwhelming', '😴 Unnecessary'],
  },
  {
    question: 'What best describes your energy level at school?',
    options: ['🔥 High', '💤 Low', '📚 Balanced', '🎢 Rollercoaster'],
  },
  {
    question: 'How do you feel when participating in extracurricular activities?',
    options: ['🕺 Excited', '😐 Neutral', '😴 Tired', '😓 Nervous'],
  },
  {
    question: 'How do you feel when taking part in a class discussion?',
    options: ['🗣️ Confident', '🤔 Curious', '😳 Nervous', '😴 Uninterested'],
  },
  {
    question: 'What’s your mood during a lunch break?',
    options: ['😋 Happy', '🤗 Social', '😐 Neutral', '😓 Rushed'],
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
        {studentMoodQuestions.map((element, index) => (
          <DisplayQuestion key={index} data={element} onAnswerSelected={handleAnswerSelected} />
        ))}
      </div>
      <button
        onClick={handleSubmit}
      >
        Submit Answers
      </button>




    </div>
  );
};

export default StudentQuestions;
