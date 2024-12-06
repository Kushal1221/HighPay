import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./style/login.css";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();

  const [numberplate, setNumberplate] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    const formattedNumberplate = numberplate.toUpperCase();
    axios.get("http://localhost:5000/login", {
      params: { numberplate: formattedNumberplate, password },
      })
      .then((result) => {
        console.log(result);
        navigate("/"); 
      })
      .catch((err) => {
        const message = err.response.data.message;
        setErrorMessage(message);
      });
  }

  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="form-box login">
          <form onSubmit={handleLogin}>

            <h1>Login</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Plate number"
                value={numberplate}
                onChange={(e) => setNumberplate(e.target.value)}
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

            <button type="submit">Login</button>

            
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}
            
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
