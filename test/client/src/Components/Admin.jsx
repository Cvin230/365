import React, { useState, useEffect } from "react";
import TrackingDetails from "./TrackingDetails";
import Pagination from "./Pagination";
import { useTrackingContext } from "../hooks/useTrackingContext";
// import { set } from "mongoose";

const Admin = () => {
  // const [allTracking, setAllTracking] = useState(null);
  const { allTracking, dispatch } = useTrackingContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [tn, setTn] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allTracking.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tracking = { name, address, tn };

    const existingTracking = allTracking.find((item) => item.tn === tn);
    if (existingTracking) {
      setError("Tracking number already exists. Please use another one.");
      setLoading(false);
      return;
    }

    const response = await fetch(
      "https://ship365-api.onrender.com/api/tracking",
      {
        method: "POST",
        body: JSON.stringify(tracking),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setAddress("");
      setTn("");
      setError(null);
      setEmptyFields([]);
      console.log("New tracking added", json);
      dispatch({ type: "CREATE_TRACKING", payload: json });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ship365-api.onrender.com/api/tracking"
        );
        console.log(response, "response");

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_TRACKING", payload: json });
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }finally {
      setLoading(false); // Move it here, inside the try block
    }
    };

    fetchTracking();
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        paddingTop: "20px",
      }}
    >
      <h1>Create Tracking Details</h1>
      <form
        onSubmit={handleSubmit}
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className={emptyFields.includes("address") ? "error" : ""}
        />

        <label htmlFor="tn">Tracking Number:</label>
        <input
          type="text"
          id="tn"
          name="tn"
          onChange={(e) => {
            setTn(e.target.value);
            setError(null);
          }}
          value={tn}
          className={emptyFields.includes("tracking number") ? "error" : ""}
        />
        <button type="submit">Generate TN</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
      {loading && <div>Loading...</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
  {currentItems &&
    currentItems.map((tracking) => (
      <TrackingDetails key={tracking._id} tracking={tracking} />
    ))}
      <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    handlePageChange={handlePageChange}
  />
</div>
    </div>
  );
};

export default Admin;
