import React, { useEffect, useState } from "react";
import "./FollowUpQuestions.css"; // Import CSS
import { IoMdSend } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import TypeWriter from "./TypeWriter";
const FeedbackQuestions = ({ FollowQuestions,answers,setAnswers}) => {
  // const [answers, setAnswers] = useState(Array(FollowQuestions.length).fill("")); // Initial state for answers
  const [displayQuestions,setDisplayQuestions]=useState([0]);

  const handleInputChange = (e, idx) => {
    const newAnswers = [...answers];
    newAnswers[idx] = e.target.value;
    setAnswers(newAnswers); // Update answers state
  };

  return (
    <div className="feedback-container">
      <div className="text-black font-bold text-[20px]">
        Please Respond to Follow-up-questions...
      </div>
         { 
            FollowQuestions &&(
              FollowQuestions.map((questions,idx)=>(
                displayQuestions.includes(idx) && (
                <div className={`"feedback-questionContainer hidden" ${displayQuestions.includes(idx)?"actice":"not_active"}`} key={idx}>
                    <label className="feedback-questionLabel"><TypeWriter text={questions}/></label>
                    <div className="w-full flex items-center gap-4">
                    <input
                      type="text"
                      className="feedback-inputBox"
                      value={answers[idx]}
                      onChange={(e) => handleInputChange(e, idx)}
                      placeholder="Answer ..."
                    />
                    { idx<FollowQuestions.length-1 &&(
                        <IoMdSend onClick={()=>{setDisplayQuestions([...displayQuestions,idx+1])}} className="h-5 w-5 hover:scale-150 cursor-pointer text-black"/>
                    )
                    }
                    </div>
                  </div>
                )
              ))
            )
         }
    </div>
  );
};

export default FeedbackQuestions;
