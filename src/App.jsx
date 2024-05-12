import { useState, useEffect } from 'react'
import Description from './components/Description/Description'
import Notification from './components/Notification/Notification'
import Options from './components/Options/Options'
import Feedback from './components/Feedback/Feedback'
import './App.css'

function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem("saved-clicks");
    if (savedClicks !== null) {
    return JSON.parse(savedClicks);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  })

  useEffect(() => {
    window.localStorage.setItem("saved-clicks", clicks);
  }, [clicks]);

  const updateFeedback = (feedbackType) => {
    setClicks({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    });
  };

  const onReset = () => {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
 const positive = Math.round((clicks.good / totalFeedback) * 100);


  return (
    <>
      <Description />
      <Options
        onUpdate={updateFeedback}
        total={totalFeedback}
        reset={onReset}
      />
     {totalFeedback > 0 ? (
        <Feedback value={clicks} total={totalFeedback} positive={positive} />
      ) : (
        <Notification total={totalFeedback} />
      )}
    </>
  )
}

export default App
