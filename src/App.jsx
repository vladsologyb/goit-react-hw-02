import { useState, useEffect } from 'react'
import Description from './components/Description/Description'
import Notification from './components/Notification/Notification'
import Options from './components/Options/Options'
import Feedback from './components/Feedback/Feedback'
import './App.css'

function App() {
 const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('current-click');

    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('current-click', JSON.stringify(clicks));
  }, [clicks]);

  const resetClicks = () => {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;

  const ratePositiveFeedback = Math.round((clicks.good / totalFeedback) * 100);

  const updateFeedback = feedbackType => {
    setClicks(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  return (
    <div >
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        onReset={resetClicks}
      />
      {!totalFeedback > 0 && <Notification />}
      {totalFeedback > 0 && (
        <Feedback
          feedback={clicks}
          total={totalFeedback}
          positive={ratePositiveFeedback}
        />
      )}
    </div>
  );
}

export default App
