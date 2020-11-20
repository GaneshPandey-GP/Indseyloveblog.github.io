import React, {useReducer, useContext} from "react";
import {reducer, initialState} from './reducer'
 
const AuthStateContext = React.createContext();


export const AuthProvider = ({ initialState, reducer, children }) => (
    <AuthStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AuthStateContext.Provider>
)

export const useAuthState = () => useContext(AuthStateContext);