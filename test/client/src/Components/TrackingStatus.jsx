import React from "react";
import styles from "../styles/TrackingStatus.module.css";
function TrackingStatus({ status, address, updateTime, name }) {
  let statusDisplay;

  if (status === "pending") {
    statusDisplay = (
      <div className={styles.trackingStatus}>
        <p style={{ color: "#a3a0a0" }}>Waiting for update...</p>
        <div className={styles.line2}></div>
        <div className={styles.circle2}></div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <p style={{ color: "#e7195a" }}>Label created, waiting for pickup</p>
        <p style={{ color: "#e7195a" }}>- {""}{address}</p>
        <p style={{ color: "#e7195a" }}>- {""}{name}</p>
        </div>
        
      </div>
    );
  } else if (status === "intransit") {
    statusDisplay = (
      <div className={styles.trackingStatus}>
        <p style={{ color: "#a3a0a0" }}>Waiting for update...</p>
        <div className={styles.line3}></div>
        <div className={styles.circle3}></div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <p style={{ color: "#1aac83" }}>Package in transit to destination</p>
            <p style={{ color: "#a3a0a0", fontSize: "15px" }}>{updateTime}</p>
        </div>

        <div className={styles.line}></div>
        <div className={styles.circle}></div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <p style={{ color: "#1aac83" }}>Label created, Your package has been shipped</p>
        <p style={{ color: "#1aac83" }}>- {""}{address}</p>
        <p style={{ color: "#1aac83" }}>- {""}{name}</p>
        </div>
      </div>
    );
  } else {
    statusDisplay = <p>Status unknown</p>;
  }

  return <div>{statusDisplay}</div>;
}

export default TrackingStatus;
