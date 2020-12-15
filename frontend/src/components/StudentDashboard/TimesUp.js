import React from 'react'
import TestRedirect from "./TestRedirect";

const TimesUp = (props)=> {
return(
    <>
       <div className="main" role="alert">
            <div className tabindex="-1" role="dialog" data-toggle="modal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title alert alert-danger">Times Up</h5>
                  
                  </div>
                  <div className="modal-body">
                    <p>Please Submit Your Test.</p>
                  </div>
                  <div className="modal-footer">
                    <TestRedirect handleSubmit={props.handleSubmit} />
                  </div>
                </div>
              </div>
            </div>
          </div>  
    </>
)
};
export default TimesUp;