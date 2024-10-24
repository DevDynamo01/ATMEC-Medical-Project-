import React, { useState } from "react";
import "./FollowUpQuestions.css"; // Importing external CSS
import axios from 'axios'
import FeedbackQuestions from "./FeedbackQuestion";
import DiagnosisReport from "./DiagonsisReport";
import TreatmentPlan from "./TreatmentPlan";
import Loader from "./Loader";
const FollowUpQuestions = () => {
  const [inputValue, setInputValue] = useState("");
  const [possibleDisease,setPossibleDisease]=useState([]);
  const [FollowQuestions,setFollowQuestions]=useState([]);
  const [answers, setAnswers] = useState(Array(FollowQuestions.length).fill(""));
  const [predictDisease,setPredictDisease]=useState();
  const [treatmentQuestions,setTreatmentQuestions]=useState();
  const [answersTreatment, setAnswersTreatment] = useState(Array(FollowQuestions.length).fill(""));
  const [loading,setLoading]=useState(false);
  const [finalTreatmentPlan,setFinalTreatmentPlan]=useState();
  const handleInputChange = (e, idx) => {
    const newAnswers = [...answers];
    newAnswers[idx] = e.target.value;
    setAnswers(newAnswers); // Update answers state
  };

   const handleSubmitAnswers = async () => {
    // Handle submission logic here
    const data={
        "symptoms":inputValue,
        "possible_diseases":possibleDisease,
        "questions":FollowQuestions,
        "answers":answers
    }
    setLoading(true);
    try{
    console.log(data);
    const response=await axios.post(API_URL+"/predict",{data});
    console.log("Respone from predicted 1", response?.data);
    setPredictDisease(response?.data);
    }
    catch(err){
        console.log(err);
    }
    setLoading(false);
  };
  const getQuestionForTreatMent= async ()=>{
    const data={
        "details":predictDisease?.details,
        "disease":predictDisease?.disease,
        "summary":predictDisease?.summary,
    }
    setLoading(true);
    try{
        console.log(data);
        const response=await axios.post(API_URL+"/questions-for-treatment",{data});
        console.log("Respone from predicted 2", response?.data);
        setTreatmentQuestions(response?.data?.questions);
        }
    catch(err){
            console.log(err);
    }
    setLoading(false);
  }
  const handleSubmitAnswersTreatMent= async () => {
    // Handle submission logic here
    const data={
        "details":predictDisease?.details,
        "disease":predictDisease?.disease,
        "summary":predictDisease?.summary,
        "questions":treatmentQuestions,
        "answers":answersTreatment
    }
    setLoading(true);
    try{
    console.log(data);
    const response=await axios.post(API_URL+"/treatment-plan",{data});
    console.log("Respone from predicted after treatment follow up questions", response?.data);
    setFinalTreatmentPlan(response?.data);
    }
    catch(err){
        console.log(err);
    }
    setLoading(false);
  };
  async function callBackendFolowUpQuestions(){
    setLoading(true);
      try{
        if(inputValue=="")
                return;
        const data=inputValue;
        console.log("Foloe up api is called",data);
        const response=await axios.post(API_URL+"/follow-up-questions",{"symptoms":data});
        console.log(response?.data);
        setPossibleDisease(response?.data?.possible_disease)
        setFollowQuestions(response?.data?.questions)
      }
      catch(err){
        console.log("Error  in follow-up questions");
      }
      setLoading(false);
  }
  const handleSendClick = () => {
    // Handle the button click (e.g., send the input value)
    console.log("Send button clicked with input:", inputValue);
    setInputValue(""); // Clear input field after sending
  };

  return (
    <div className="followup-container mt-[var(--marginNavBar)]">
        <div className="flex flex-row gap-10">
            <div class="coolinput">
              <label for="input" class="text">Symptoms</label>
              <input type="text" placeholder="Enter you Synmtoms" name="input" className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              />
          </div>
            <button className="followup-sendButton" onClick={callBackendFolowUpQuestions}>
              Send
            </button>
          </div>
        <div>
        {
        possibleDisease && possibleDisease.length > 0 && 
        (   <div className="flex gap-2 border-2">
                <span className="text-[var(--purpleColor)] font-bold text-[1.5rem]">{"Possible Disease:"}</span>
                <div>
                  {possibleDisease.map((ele, idx) => (
                  <span className="feedback-disease underline" key={idx}>{ele}</span>
                  ))
                  }
                </div>
            </div>
        )
        }
        </div>
        {   
            FollowQuestions && FollowQuestions.length>0 && (
            <div>
                <FeedbackQuestions FollowQuestions={FollowQuestions}  answers={answers} setAnswers={setAnswers}/>
                <button className="feedback-submitButton" onClick={handleSubmitAnswers}>
                    Predict
                </button>
            </div>
            )
        }
        {
            predictDisease &&(
            <div>
                <DiagnosisReport data={predictDisease}/>
                <button className="feedback-submitButton" onClick={getQuestionForTreatMent}>
                    Generate Treatment
                </button>
            </div>
            )
        }
        {    
            treatmentQuestions && (
            <div>
                <FeedbackQuestions FollowQuestions={treatmentQuestions}  answers={answersTreatment} setAnswers={setAnswersTreatment}/>
                <button className="feedback-submitButton" onClick={handleSubmitAnswersTreatMent}>
                    Predict
                </button>
            </div>
            )
        }
        {
            finalTreatmentPlan &&(
                <div>
                    <TreatmentPlan data={finalTreatmentPlan}/>
                </div>
            )
        }
        <div>
        </div>
        {
          loading &&
          (<Loader/>)
        }
    </div>
  );
};

export default FollowUpQuestions;
