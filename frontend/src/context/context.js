import React, {createContext, useReducer, useContext} from "react";
import {reducer, initialState} from './reducer'
 
export const AuthStateContext = createContext();


export const AuthProvider = ({ children }) => (
    <AuthStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AuthStateContext.Provider>
)

export const useAuthState = () => useContext(AuthStateContext);