import React from "react";
import style from "../styles/TrackingDetails.module.css";
import { useTrackingContext } from "../hooks/useTrackingContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function TrackingDetails({ tracking }) {
  const { dispatch } = useTrackingContext();

  const handleDelete = async () => {
  try {
    const response = await fetch("https://three65test.onrender.com/api/tracking/" + tracking._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://365test-murex.vercel.app/",
        // Add any other headers if necessary
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    dispatch({ type: "DELETE_TRACKING", payload: json });
  } catch (error) {
    console.error('Error:', error);
  }
};


  const handleIntransit = async () => {
    const response = await fetch("https://three65test.onrender.com/api/tracking/" + tracking._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "intransit" }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TRACKING", payload: json });
    }
  };

  return (
    <div className={style.trackingDetails}>
      <h4>{tracking.name}</h4>
      <p>
        <strong>Address:</strong> {tracking.address}
      </p>
      <p>
        <strong>TN:</strong> {tracking.tn}
      </p>
      <p>
        <strong>Status:</strong> {tracking.status}
      </p>
      <p>
        {formatDistanceToNow(new Date(tracking.createdAt), { addSuffix: true })}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
        }}
      >
        {tracking.status === "pending" ? (
          <span
            onClick={handleIntransit}
            style={{
              backgroundColor: "#1aac83",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            In Transit
          </span>
        ) : null}

        <span
          className="material-icons"
          onClick={handleDelete}
          style={{
            backgroundColor: "#e7195a",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          delete
        </span>
      </div>
    </div>
  );
}

export default TrackingDetails;
