import React, { useState } from "react";
import "./login.scss";
import { Link, Navigate } from "react-router-dom";
import { onAuthStateChanged,  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/user";
import { toast } from "react-toastify";
import Loader from '../loader/Loader'

export default function Login() {
  const [curUser, setCurUser] = useState({});
  const [error, setError] = useState("");
  const { user ,loading} = useSelector((state) => state.userReducer);  
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (currentUser) =>
    dispatch(setUser(currentUser?.email))
  );

  const login = async (e) => {
    e.preventDefault();
    if(!curUser.email || !curUser.password){
      setError("Please enter all the credentials")
      return;
    }
    setError("");
    dispatch(setLoading(true));
    try {
        await signInWithEmailAndPassword(
        auth,
        curUser.email,
        curUser.password
        );
        toast("Login successful")
        dispatch(setLoading(false));        
      } catch (error) {
        setError("Wrong email or password");
        dispatch(setLoading(false));
    }
  };  

  if (user) return <Navigate to={"/"} />;

  return (
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <form className="login-container">
          <h1>Login Page</h1>
          <h2 className="error">{error}</h2>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            required
            onChange={(e) => setCurUser({ ...curUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={(e) =>
              setCurUser({ ...curUser, password: e.target.value })
            }
            required
          />
          <button className="button" type="Submit" onClick={login}>
            Login
          </button>
          <div className="item">
            Forgot Password ? , <Link to={"/forgot"}>Reset Now</Link>
          </div>
          <div className="item">
            Don't have an account , <Link to={"/register"}>Register Now</Link>
          </div>
        </form>
      )}
    </div>
  );
}
