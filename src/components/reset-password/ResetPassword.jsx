import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/user";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import Loader from "../loader/Loader";

export default function ResetPassword() {
  const { loading } = useSelector((state) => state.userReducer);
  const [curUser, setCurUser] = useState({});
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!curUser.email) {
      setError("Please enter all the credentials");
      return;
    }
    dispatch(setLoading(true));
    setSent(false);
    try {
      await sendPasswordResetEmail(auth, curUser.email);
      toast.success("reset mail sent successfully");
      setSent(true);
      dispatch(setLoading(false));
    } catch (error) {
      setError("Email is not registered");
      setSent(false);
      dispatch(setLoading(false));
    }
  };

  if (sent) return <Navigate to={"/login"} />;

  return (
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <form className="login-container">
          <h1>Reset password</h1>
          <div className="item">
            Enter the email on which reset link will be sent.
          </div>
          {error && <h2 className="error">{error}</h2>}
          <input
            type="email"
            placeholder="Enter Email Address"
            required
            onChange={(e) => setCurUser({ ...curUser, email: e.target.value })}
          />
          <button className="button" type="submit" onClick={resetPassword}>
            Send
          </button>
          <div>
            Remembered the password ? , <Link to={"/login"}>Login Now</Link>{" "}
          </div>
        </form>
      )}
    </div>
  );
}
