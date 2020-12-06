import React from 'react'

export default function Timer() {
    const testtime = parseInt(localStorage.getItem("timer"))
    // const hrs = testtime / 60
    const [mins, setMins] = React.useState(testtime);
    const [secs, setSecs] = React.useState(60);

  
    React.useEffect(() => {
      if (mins > 0) {
        setTimeout(() => setMins(mins - 1), 60000)
        setTimeout(() => setSecs(secs - 1), 1000)
      } else {
        setMins('BOOOOM!');
      }
    });
  
    return (
      <div className="App">
        <div>
          {mins}:{secs}
        </div>
      </div>
    );
  }