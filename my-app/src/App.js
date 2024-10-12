import logo from './logo.svg';
import './App.css';
// import VoiceWidget from "./VoiceWidget";
import Dictaphone from './components/SpeechRecognition';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import TextToSpeech from './components/TextToSpeech';
function App() {
  const text="hello this is surya the destroyer of the world";
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Dictaphone></Dictaphone>
      <TextToSpeech content={text}></TextToSpeech>
    </div>
  );
}

export default App;
