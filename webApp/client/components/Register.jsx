import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/register.css";

function Register() {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [numberplate, setNumberplate] = useState("");
  const [deviceid, setDeviceid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(phonenumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      return;
    }
    if (!/^.{8,}$/.test(password)) {
      setErrorMessage("Password should be at least 8 characters");
      return;
    }    

    const formattedNumberplate = numberplate.toUpperCase();

    axios.post("http://localhost:5000/register", {
        username,
        phonenumber,
        numberplate: formattedNumberplate,
        deviceid,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/registersuccess"); 
      })
      .catch((err) => {
        const message = err.response.data.message;
        setErrorMessage(message);
      });
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="register-wrapper">
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>

            <h1>Registration</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Phone number"
                value={phonenumber || ""}
                onChange={(e) => setPhonenumber(Number(e.target.value))}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Plate number"
                value={numberplate}
                onChange={(e) => setNumberplate(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Device ID"
                value={deviceid || ""}
                onChange={(e) => setDeviceid(Number(e.target.value))}
                required
              />
            </div>

            <div className="input-box input-password">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} onClick={handlePasswordToggle}></i>
            </div>
            
            <button type="submit">Register</button>

            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}
            
            <div className="login-link">
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
