import { createContext, useReducer } from "react";

export const TrackingContext = createContext();

export const trackingReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRACKING":
      return {
        allTracking: action.payload,
      };
    case "CREATE_TRACKING":
      return {
        allTracking: [action.payload, ...state.allTracking],
      };
    case "UPDATE_TRACKING":
      return {
        allTracking: [
          action.payload,
          ...state.allTracking.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
      };
    case "DELETE_TRACKING":
      return {
        allTracking: state.allTracking.filter(
          (t) => t._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const TrackingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackingReducer, {
    allTracking: null,
  });

  return (
    <TrackingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TrackingContext.Provider>
  );
};
