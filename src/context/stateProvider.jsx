import React, { createContext, useContext, useReducer } from "react";
//import reducer, {initialState} from "./reducer/reducer";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <>
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useStateValue = () => useContext(StateContext);
