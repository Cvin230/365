import { TrackingContext } from "../context/TrackingContext";
import { useContext } from "react";

export const useTrackingContext = () => {
  const context = useContext(TrackingContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
