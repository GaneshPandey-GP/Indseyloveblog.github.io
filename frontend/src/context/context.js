import React, {useReducer, useContext} from "react";
import {AuthReducer, initialState} from './reducers'
 
const AuthStateContext = React.createContext();


export const AuthProvider = ({ initialState, AuthReducer, children }) => (
    <AuthStateContext.Provider value={useReducer(AuthReducer, initialState)}>
        {children}
    </AuthStateContext.Provider>
)

export const useAuthState = () => useContext(AuthStateContext);