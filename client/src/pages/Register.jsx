import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
export const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async(e) => {
    e.preventDefault();
    try{
      await axios.post("/register",{
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
      });
      alert("Registration Successful! Redirecting to Login Page")
      navigate("/login");
    }
    catch(err){
      alert("Registration not successful! Try Again")
    }
    
  };
  return (
    <div className="form-container">
      <p className="form-heading">Register</p>
      <form onSubmit={registerUser} className="auth-form">
        <input
          ref={nameRef}
          type="text"
          id="name"
          placeholder="Sameer Verma"
          required
        />
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="your@email.com"
          required
        />
        <div className="pass">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
            required
          />
          <button
          type="button"
            className="toggle-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoIosEyeOff size={18} color="black" />
            ) : (
              <IoIosEye size={18} color="black" />
            )}
          </button>
        </div>
        <Button id="submit" text="Register" />
      </form>
      <div className="redirect">
        Already a Member?
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
