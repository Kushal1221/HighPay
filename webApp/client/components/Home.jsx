import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Home() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [tripsData, setTripsData] = useState({});

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:5000/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.userData);
          setTripsData(response.data.trips);
        })
        .catch((error) => {
          console.error("Error accessing protected route:", error);
        });
    } else {
      navigate("/login");
    }
  }, []);


  return (
    <div>
      <h1>Welcome, {userData.username || "User"}</h1>
      <p>
        <strong>Number Plate:</strong> {userData.numberplate}
      </p>
      <p>
        <strong>Phone Number:</strong> {userData.phonenumber}
      </p>
      <p>
        <strong>Device ID:</strong> {userData.deviceid}
      </p>
      <h2>Total Trips {tripsData.length}</h2>
      {tripsData.length > 0 ? (
        <ul>
          {tripsData.map((trip, index) => (
            <li key={trip._id}>
              <p>
                <strong>Trip #{index + 1}</strong>
              </p>
              <p>
                <strong>Entry Date:</strong> {trip.entry.date}
              </p>
              <p>
                <strong>Entry Time:</strong> {trip.entry.time}
              </p>
              <p>
                <strong>Exit Date:</strong> {trip.exit.date}
              </p>
              <p>
                <strong>Exit Time:</strong> {trip.exit.time}
              </p>
              <p>
                <strong>Distance:</strong> {trip.distance}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips available.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
