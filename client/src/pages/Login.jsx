import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { Button } from "../components/Button";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

export const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const {setUser,setUserFetched} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post("/login",{
        email:emailRef.current.value,
        password:passwordRef.current.value
      });
      setUser(res.data);
      setUserFetched(true);
      alert("Login Successful! Redirecting to Home page");
      navigate("/");
    }
    catch(err){
      alert("Email or Password is incorrect");
    }
  }

  return (
    <div className="form-container">
      <p className="form-heading">Login</p>
      <form onSubmit={handleLogin} className="auth-form">
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
        <Button id="submit" text="Login" />
      </form>
      <div className="redirect">
        Don't have an account yet?
        <Link to="/register">Register Now</Link>
      </div>
    </div>
  );
};
