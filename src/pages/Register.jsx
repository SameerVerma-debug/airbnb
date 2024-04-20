import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is Requried"),
    password: yup
      .string()
      .min(8, "Password should be of atleast length 8")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUser = async (data) => {
    try {
      await axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert("Registration Successful! Redirecting to Login Page");
      navigate("/login");
    } catch (err) {
      alert("Registration not successful! Try Again");
    }
  };
  return (
    <div className="form-container">
      <p className="form-heading">Register</p>
      <form onSubmit={handleSubmit(registerUser)} className="auth-form">
        <div>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Sameer Verma"
          />
          {errors?.name && <p className="form-error">{errors?.name?.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            type="text"
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
          {errors?.password && (
            <p className="form-error">{errors?.password?.message}</p>
          )}
        </div>
        <Button id="submit" text="Register" />
      </form>
      <div className="redirect">
        Already a Member?
        <Link to="/login">Login</Link>
      </div>
      <div className="redirect">
      <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};
