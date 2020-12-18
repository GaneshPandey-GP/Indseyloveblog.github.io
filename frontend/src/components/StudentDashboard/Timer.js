import React, { useEffect, useState } from "react";
import TimerIcon from "@material-ui/icons/Timer";
import { Redirect } from "react-router-dom";
import TestRedirect from "./TestRedirect";

export default function Timer(props) {
  const testtime = parseInt(localStorage.getItem("timer"));
  
  const [minutes, setMinutes] = useState(testtime - 1);
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    localStorage.setItem("min",minutes)
    if (!minutes) return;
    const intervelID = setInterval(() => {
      setMinutes(minutes - 1);
     
      minutes === 0 ? setSeconds(0) : setSeconds(59);
    }, 1000 * 60);
    return () => {
     
      clearInterval(intervelID);
    };
  }, [minutes]);

  useEffect(() => {
    localStorage.setItem("sec",seconds)
    
    if (!seconds) return;
    const intervelID = setInterval(() => {
      setSeconds(seconds - 1);
      
    }, 1000);

    return () => {
    
      clearInterval(intervelID);
    };
  }, [seconds]);

  return (
    <>
      {minutes === 0 && seconds === 0 ? (
        <>
          <div className="alert alert-danger text-center " >
            Times Up!!
          
          </div> 
         
         
         
        </>
      ) : (
        <>
          {minutes >= 0 ? (
            <div className="container col-sm-10 text-right mt-4">
              <span className="text-warning">
                <strong>
                  <TimerIcon /> Time Left
                </strong>
              </span>
              {minutes < 2 ? (
                <h2 className="text-danger">
                  {minutes < 10 ? `0${minutes}` : `${minutes}`} :
                  {seconds < 10 ? `0${seconds}` : ` ${seconds}`}
                </h2>
              ) : (
                <h2>
                  {minutes < 10 ? `0${minutes}` : `${minutes}`} :
                  {seconds < 10 ? `0${seconds}` : `${seconds}`}
                </h2>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </>
  );
}
