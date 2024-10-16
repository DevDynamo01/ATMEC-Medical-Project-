import React from 'react';
import TextTransition, { presets } from 'react-text-transition';
const TEXTS = ['CHAT', 'YOUR', 'CURE'];
const Home = () => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="homePage">
      <div>Hello NavBar</div>
      <div className="imageComponent">
        <div className="heading">
          <TextTransition springConfig={presets.wobbly}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </div>
        <img src="patient.jpg" />
      </div>
    </div>
  );
};

export default Home;
