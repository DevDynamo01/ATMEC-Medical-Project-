




//https://www.bemindfulonline.com/test-your-stress
// https://silver.urih.com/
//https://mprep.info/gpu/




// // import React, { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// const SurveyComponent = () => {
//   const [responses, setResponses] = useState([]);
//   const [submitted, setSubmitted] = useState(false);

//   const questions = [
//     {
//       question: "How do you usually feel when starting your day?",
//       options: ["😊 Excited", "😐 Neutral", "😟 Stressed", "😴 Tired"],
//     },
//     {
//       question: "Which emoji best describes your current mood?",
//       options: ["😊 Happy", "😔 Sad", "😡 Angry", "😵 Overwhelmed", "😎 Confident"],
//     },
//     {
//       question: "When making decisions, do you rely more on:",
//       options: ["🤔 Logical", "❤️ Emotional", "🌟 Instinct", "🤝 Advice"],
//     },
//     {
//       question: "What helps you relax after a stressful day?",
//       options: ["🎵 Music", "📞 Talking", "🌙 Alone Time", "🏃 Physical Activity"],
//     },
//   ];

//   const handleResponse = (questionIndex, option) => {
//     const updatedResponses = [...responses];
//     updatedResponses[questionIndex] = option;
//     setResponses(updatedResponses);
//   };

//   const handleSubmit = () => {
//     if (responses.length === questions.length) {
//       setSubmitted(true);
//     } else {
//       alert("Please answer all questions!");
//     }
//   };

//   // Analyze insights
//   const generateInsights = () => {
//     const moodCounts = responses.reduce((acc, mood) => {
//       acc[mood] = (acc[mood] || 0) + 1;
//       return acc;
//     }, {});

//     let dominantMood = Object.keys(moodCounts).reduce((a, b) =>
//       moodCounts[a] > moodCounts[b] ? a : b
//     );

//     return {
//       moodCounts,
//       dominantMood,
//     };
//   };

//   const insights = submitted ? generateInsights() : null;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Mood Analysis Survey</h1>
//       {!submitted ? (
//         <div>
//           {questions.map((q, index) => (
//             <div key={index} className="mb-6">
//               <p className="text-lg font-medium mb-2">{q.question}</p>
//               {q.options.map((option) => (
//                 <button
//                   key={option}
//                   onClick={() => handleResponse(index, option)}
//                   className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
//                     responses[index] === option
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           ))}
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg mt-4"
//           >
//             Submit
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Survey Results</h2>

//           {/* Bar Chart for Mood Analysis */}
//           <div className="mb-6">
//             <Bar
//               data={{
//                 labels: Object.keys(insights.moodCounts),
//                 datasets: [
//                   {
//                     label: "Mood Responses",
//                     data: Object.values(insights.moodCounts),
//                     backgroundColor: [
//                       "#ff6384",
//                       "#36a2eb",
//                       "#ffcd56",
//                       "#4bc0c0",
//                       "#9966ff",
//                     ],
//                   },
//                 ],
//               }}
//               options={{ responsive: true, maintainAspectRatio: false }}
//             />
//           </div>

//           {/* Pie Chart for Mood Proportions */}
//           <div className="mb-6">
//             <Pie
//               data={{
//                 labels: Object.keys(insights.moodCounts),
//                 datasets: [
//                   {
//                     data: Object.values(insights.moodCounts),
//                     backgroundColor: [
//                       "#ff6384",
//                       "#36a2eb",
//                       "#ffcd56",
//                       "#4bc0c0",
//                       "#9966ff",
//                     ],
//                   },
//                 ],
//               }}
//               options={{ responsive: true, maintainAspectRatio: false }}
//             />
//           </div>

//           {/* Insights */}
//           <h3 className="text-lg font-medium">
//             Dominant Mood: <span className="text-blue-600">{insights.dominantMood}</span>
//           </h3>
//           <p className="text-gray-600">
//             Based on the survey, most users identified their mood as{" "}
//             <b>{insights.dominantMood}</b>. Encourage activities that match this mood for better
//             mental well-being!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveyComponent;


// import React, { useState } from "react";

// const emojis = [
//   { emoji: "😊", mood: "positive" },
//   { emoji: "🤩", mood: "positive" },
//   { emoji: "😌", mood: "positive" },
//   { emoji: "🤗", mood: "positive" },
//   { emoji: "💪", mood: "positive" },
//   { emoji: "🥳", mood: "positive" },
//   { emoji: "😎", mood: "positive" },
//   { emoji: "🧐", mood: "positive" },
//   { emoji: "🎉", mood: "positive" },
//   { emoji: "🚀", mood: "positive" },
//   { emoji: "😔", mood: "negative" },
//   { emoji: "😟", mood: "negative" },
//   { emoji: "😒", mood: "negative" },
//   { emoji: "😴", mood: "negative" },
//   { emoji: "😫", mood: "negative" },
//   { emoji: "😵", mood: "negative" },
//   { emoji: "😓", mood: "negative" },
//   { emoji: "😢", mood: "negative" },
//   { emoji: "🤯", mood: "negative" },
//   { emoji: "😠", mood: "negative" },
// ];

// const EmojiMoodSelector = () => {
//   const [selectedEmojis, setSelectedEmojis] = useState([]);
//   const [result, setResult] = useState("");

//   const handleEmojiClick = (emoji) => {
//     if (selectedEmojis.includes(emoji)) {
//       setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
//     } else if (selectedEmojis.length < 10) {
//       setSelectedEmojis([...selectedEmojis, emoji]);
//     }
//   };

//   const analyzeMood = () => {
//     const moodCount = { positive: 0, negative: 0 };

//     selectedEmojis.forEach((emoji) => {
//       const mood = emojis.find((e) => e.emoji === emoji)?.mood;
//       if (mood) moodCount[mood]++;
//     });

//     if (moodCount.positive > moodCount.negative) {
//       setResult("You are feeling mostly positive right now! 😊");
//     } else if (moodCount.positive < moodCount.negative) {
//       setResult("You are feeling mostly negative right now. 😔");
//     } else {
//       setResult("You have a balanced mood. 🤔");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Emojis That Match Your Mood</h1>
//       <div className="grid grid-cols-5 gap-4 mb-6">
//         {emojis.map((item, index) => (
//           <button
//             key={index}
//             className={`text-3xl p-2 rounded-lg ${
//               selectedEmojis.includes(item.emoji) ? "bg-blue-200" : "bg-gray-200"
//             }`}
//             onClick={() => handleEmojiClick(item.emoji)}
//           >
//             {item.emoji}
//           </button>
//         ))}
//       </div>
//       <button
//         onClick={analyzeMood}
//         className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-bold"
//         disabled={selectedEmojis.length < 10}
//       >
//         Analyze Mood
//       </button>
//       {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
//     </div>
//   );
// };

// export default EmojiMoodSelector;



import React, { useState } from "react";

const emojis = [
  { emoji: "😊", category: "positive" },
  { emoji: "🤩", category: "positive" },
  { emoji: "😌", category: "positive" },
  { emoji: "🤗", category: "positive" },
  { emoji: "💪", category: "positive" },
  { emoji: "🥳", category: "positive" },
  { emoji: "😎", category: "positive" },
  { emoji: "🎉", category: "positive" },
  { emoji: "🌞", category: "positive" },
  { emoji: "🌟", category: "positive" },
  { emoji: "😔", category: "negative" },
  { emoji: "😢", category: "negative" },
  { emoji: "😠", category: "negative" },
  { emoji: "😫", category: "negative" },
  { emoji: "😞", category: "negative" },
  { emoji: "😓", category: "negative" },
  { emoji: "😡", category: "negative" },
  { emoji: "😭", category: "negative" },
  { emoji: "😟", category: "negative" },
  { emoji: "😒", category: "negative" },
  { emoji: "😵‍💫", category: "stressed" },
  { emoji: "😓", category: "stressed" },
  { emoji: "🤯", category: "stressed" },
  { emoji: "🥵", category: "stressed" },
  { emoji: "😨", category: "stressed" },
  { emoji: "😩", category: "stressed" },
  { emoji: "🫠", category: "stressed" },
  { emoji: "😰", category: "stressed" },
  { emoji: "🧠", category: "stressed" },
  { emoji: "💭", category: "stressed" },
  { emoji: "🙄", category: "frustrated" },
  { emoji: "😤", category: "frustrated" },
  { emoji: "🤨", category: "frustrated" },
  { emoji: "😑", category: "frustrated" },
  { emoji: "🤬", category: "frustrated" },
  { emoji: "😖", category: "frustrated" },
  { emoji: "😣", category: "frustrated" },
  { emoji: "😕", category: "frustrated" },
  { emoji: "👿", category: "frustrated" },
  { emoji: "😡", category: "frustrated" },
  { emoji: "🤩", category: "excited" },
  { emoji: "🥳", category: "excited" },
  { emoji: "🏆", category: "excited" },
  { emoji: "🎊", category: "excited" },
  { emoji: "🚀", category: "excited" },
  { emoji: "🌿", category: "calm" },
  { emoji: "🌅", category: "calm" },
  { emoji: "🛋️", category: "calm" },
  { emoji: "😌", category: "calm" },
  { emoji: "🌙", category: "calm" },
];

const EmojiMoodAnalyzer = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [result, setResult] = useState("");

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

  // Count the occurrences of each mood category based on selected emojis
  selectedEmojis.forEach((emoji) => {
    const category = emojis.find((e) => e.emoji === emoji)?.category;
    if (category) moodCount[category]++;
  });

  // Determine the dominant mood based on the highest count
  const dominantMood = Object.keys(moodCount).reduce((a, b) =>
    moodCount[a] > moodCount[b] ? a : b
  );

  let message = "";
  let suggestion = "";

  switch (dominantMood) {
    case "positive":
      message = "You are feeling positive and happy! 😊";
      suggestion = "Keep up the good mood! Consider sharing your happiness with others or treating yourself to something you enjoy.";
      break;

    case "negative":
      message = "You are feeling negative or upset. 😔";
      suggestion = "Take a moment to reflect on what’s bothering you. Try journaling your thoughts, talking to a trusted friend, or going for a short walk.";
      break;

    case "stressed":
      message = "You are feeling stressed or anxious. 😓";
      suggestion = "Consider practicing deep breathing or meditation. A short break or listening to calming music might help reduce stress.";
      break;

    case "frustrated":
      message = "You are feeling frustrated or annoyed. 😤";
      suggestion = "Try stepping away from the source of frustration and engaging in a relaxing activity, such as reading, exercising, or taking a warm shower.";
      break;

    case "excited":
      message = "You are feeling excited and energetic! 🤩";
      suggestion = "Channel your excitement into something productive, like starting a new project or sharing your energy with friends and loved ones.";
      break;

    case "calm":
      message = "You are feeling calm and relaxed. 😌";
      suggestion = "Enjoy the serenity! Consider activities that nurture this state, like yoga, meditation, or spending time in nature.";
      break;

    default:
      message = "Your mood seems balanced. 🤔";
      suggestion = "Maintain this balance by engaging in activities that bring you joy and fulfillment, such as hobbies, connecting with loved ones, or simply resting.";
      break;
  }

  // Combine the mood message and suggestion
  setResult(`${message} Suggestion: ${suggestion}`);
};


  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Emojis That Match Your Mood</h1>
      <p>Select up to 10 emojis:</p>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {emojis.map((item, index) => (
          <button
            key={index}
            className={`text-3xl p-2 rounded-lg ${
              selectedEmojis.includes(item.emoji) ? "bg-blue-200" : "bg-gray-200"
            }`}
            onClick={() => handleEmojiClick(item.emoji)}
          >
            {item.emoji}
          </button>
        ))}
      </div>
      <button
        onClick={analyzeMood}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-bold"
        disabled={selectedEmojis.length < 1}
      >
        Analyze Mood
      </button>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </div>
  );
};

export default EmojiMoodAnalyzer;
