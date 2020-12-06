import React, { useEffect, useState } from "react";
import TimerIcon from '@material-ui/icons/Timer';
import { useAuthState } from "../../context";

export default function Timer() {
    const testtime = parseInt(localStorage.getItem("timer"))
    const [minutes, setMinutes] = useState(testtime)
    const [{loading}] = useAuthState()
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    if (!minutes) return;
    const intervelID = setInterval(() => {
      setMinutes(minutes - 1);
      minutes - 1 === 0 ? setSeconds(0) : setSeconds(59);
    }, 1000 * 60);
    return () => {
      clearInterval(intervelID);
    };
  }, [minutes]);

const runTimer = () => {
    if (!seconds) return;
    const intervelID = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervelID);
    };
}
if(!loading) runTimer()
  return (
    <>
      {minutes !== 0 ? (
        <div className="container col-sm-10 text-right">
          <span className="text-info"> <strong><TimerIcon/> Time Left</strong></span>
          {minutes < 2 ? (
            <h2 className="text-danger">
             
              {minutes < 10 ?  `0${minutes}` :  `${minutes}`} :
              {seconds < 10 ? `0${seconds}` :  ` ${seconds}`}
            </h2>
          ) : (
            <h2>
              {minutes < 10 ?  `0${minutes}` :  `${minutes}`} :
              {seconds < 10 ?  `0${seconds}` :  `${seconds}`}
            </h2>
          )}
        </div>
      ) : (
        <div class="alert alert-danger text-center " role="alert">
          Times Up!!
        </div>
      )}
    </>
  );

  }