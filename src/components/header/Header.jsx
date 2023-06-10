import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.userReducer);
  const logout = async () => {
    try {
      await signOut(auth);
      toast("logout successfully");
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="header">
      <div className="left">
        <span>Todo</span> <span>App</span>
      </div>
      <div className="right">
        <Link to={"/"}>{typeof(user)==="string" && user}</Link>
        {user && (
          <button to={"/logout"} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
