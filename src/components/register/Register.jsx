import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/user";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function Register() {
  const [curUser, setCurUser] = useState({});
  const [error, setError] = useState("");
  const { user, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (currentUser) =>
    dispatch(setUser(currentUser?.email))
  );

  const register = async (e) => {
    e.preventDefault();
    if(!curUser.email || !curUser.password){
      setError("Please enter all the credentials")
      return;
    }    
    dispatch(setLoading(true));
    try {
      await createUserWithEmailAndPassword(
        auth,
        curUser.email,
        curUser.password
      );      
      dispatch(setLoading(false));
      toast("user registered successfully");    
    } catch (err) {
      dispatch(setLoading(false));
      setError("email already registered");
    }
  };  

  if (user) return <Navigate to={"/"} />;
  return (
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <form className="login-container">
          <h1>Register Page</h1>
          <h2 className="error">{error}</h2>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            required
            onChange={(e) => {
              setCurUser({ ...curUser, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            onChange={(e) => {
              setCurUser({ ...curUser, password: e.target.value });
            }}
          />
          <button className="button" onClick={register} type="submit">Register</button>
          <div className="item">
            Already have an account , <Link to={"/login"}>Login Now</Link>
          </div>
        </form>
      )}
    </div>
  );
}
