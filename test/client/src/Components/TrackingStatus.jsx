import React from "react";
import styles from "../styles/TrackingStatus.module.css";
function TrackingStatus({ status, address, updateTime }) {
  let statusDisplay;

  if (status === "pending") {
    statusDisplay = (
      <div className={styles.trackingStatus}>
        <p style={{ color: "#a3a0a0" }}>Waiting for update</p>
        <div className={styles.line2}></div>
        <div className={styles.circle2}></div>
        <p style={{ color: "#e7195a" }}>Label created, waiting for pickup</p>
      </div>
    );
  } else if (status === "intransit") {
    statusDisplay = (
      <div className={styles.trackingStatus}>
        <p style={{ color: "#a3a0a0" }}>Waiting for update</p>
        <div className={styles.line3}></div>
        <div className={styles.circle3}></div>
        <div>
          <p style={{ color: "#1aac83" }}>Package in transit to destination</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#1aac83" }}>{address}</p>
            <p style={{ color: "#a3a0a0" }}>{updateTime}</p>
          </div>
        </div>

        <div className={styles.line}></div>
        <div className={styles.circle}></div>
        <p style={{ color: "#1aac83" }}>Label created, waiting for pickup</p>
      </div>
    );
  } else {
    statusDisplay = <p>Status unknown</p>;
  }

  return <div>{statusDisplay}</div>;
}

export default TrackingStatus;
