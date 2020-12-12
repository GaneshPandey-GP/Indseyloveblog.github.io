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
          {/* <div className="alert alert-danger text-center " >
            Times Up!!
          
          </div> */}
         
         
          <div className="main" role="alert" style={{backdropFilter: 'blur(1115px)', background:"rgba(255,255,255,0.2)",height:"100vh",overflowY:"hidden"}}>
            <div className tabindex="-1" role="dialog" data-toggle="modal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Times Up</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Modal body text goes here.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                    <TestRedirect handleSubmit={props.handleSubmit} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
