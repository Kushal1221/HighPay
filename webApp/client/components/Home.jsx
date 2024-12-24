import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import highpayLogo from "./Assets/highpayLogo.webp";
import userLogo from "./Assets/user.png";
import "./style/home.css";

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
    <div className="home">
      <div className="homeContainer">
        <div className="homeHeader">
          <img src={highpayLogo} className="highpayLogo"></img>
          <div className="userHeader">
            <img src={userLogo} className="userLogo"></img>
            <h2>Welcome, {userData.username || "User"}</h2>
            <h4>{userData.numberplate}</h4>
            <h4>{userData.phonenumber}</h4>
            <h4>Device ID: {userData.deviceid}</h4>
            <h4>Total Trips: {tripsData.length}</h4>
          </div>
          <div className="logoutBtn">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="homeBody">
          {tripsData.length > 0 ? (
            <ul>
              {tripsData.map((trip, index) => (
                <div key={trip._id} className="tripCard">
                  <div className="tripDetails">
                    <div className="entry alignment">
                      <p>
                        <strong>Entry Data</strong>
                      </p>
                      <p>
                        <strong>Entry Date:</strong> {trip.entry.date}
                      </p>
                      <p>
                        <strong>Entry Time:</strong> {trip.entry.time}
                      </p>
                    </div>

                    <div className="distance alignment">
                      <h4>Trip {index + 1}</h4>
                      <h4>Distance: {trip.distance}km</h4>
                    </div>

                    <div className="exit alignment">
                      <p>
                        <strong>Exit Data</strong>
                      </p>
                      <p>
                        <strong>Exit Date:</strong> {trip.exit.date}
                      </p>
                      <p>
                        <strong>Exit Time:</strong> {trip.exit.time}
                      </p>
                    </div>
                  </div>

                  <div className="payment">Pay: {trip.price}rs</div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No trips available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
