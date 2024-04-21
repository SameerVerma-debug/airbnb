import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { Button } from "../components/Button";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setUserFetched } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of atleast length 8")
      .required("password is requried"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const res = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res.data.token);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.foundUser);
      setUserFetched(true);
      alert("Login Successful Redirecting to Home Page")
      navigate("/")
    } catch (err) {
      alert("Email or password is not correct")
    }
  };

  return (
    <div className="form-container">
      <p className="form-heading">Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="auth-form">
        <div>
          <input
            {...register("email")}
            id="email"
            placeholder="your@email.com"
          />
          {errors?.email && <p className="form-error">{errors?.email?.message}</p>}
        </div>
        <div>
        <div className="pass">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
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
        {errors?.password && <p className="form-error">{errors?.password?.message}</p>}
        </div>
        <Button id="submit" text="Login" />
      </form>
      <div className="redirect">
        Don't have an account yet?
        <Link to="/register">Register Now</Link>
      </div>
      <div className="redirect">
      <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};
