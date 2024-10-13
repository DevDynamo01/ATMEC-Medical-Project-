import React, { useState } from "react";
import "./FollowUpQuestions.css"; // Import CSS

const FeedbackQuestions = ({ FollowQuestions,answers,setAnswers}) => {
  // const [answers, setAnswers] = useState(Array(FollowQuestions.length).fill("")); // Initial state for answers

  const handleInputChange = (e, idx) => {
    const newAnswers = [...answers];
    newAnswers[idx] = e.target.value;
    setAnswers(newAnswers); // Update answers state
  };

  // const handleSubmit = () => {
  //   // Handle submission logic here
  //   console.log("Submitted Answers:", answers);
  //   setAnswers2(answers)
  // };

  return (
    <div className="feedback-container">
      {/* <div className="feedback-disease">
        Possible Disease: d1, d2, d3 
      </div> */}

      {FollowQuestions.map((question, idx) => (
        <div className="feedback-questionContainer" key={idx}>
          <label className="feedback-questionLabel">{`Question ${idx + 1}: ${question}`}</label>
          <input
            type="text"
            className="feedback-inputBox"
            value={answers[idx]}
            onChange={(e) => handleInputChange(e, idx)}
            placeholder="Answer ..."
          />
        </div>
      ))}

      {/* <button className="feedback-submitButton" onClick={handleSubmit}>
        Predict
      </button> */}
    </div>
  );
};

export default FeedbackQuestions;
