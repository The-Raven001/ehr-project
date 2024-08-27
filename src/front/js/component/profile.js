import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="bg-light d-flex justify-content-center align-items-center flex-column mt-5 maindiv w-25">
        <h1>Welcome!</h1>
        <div className="d-flex mb-3">
          <Link to="/edit-profile" className="me-5">
            <button className="btn btn-dark profileButton">Edit Profile</button>
          </Link>
          <Link to="/search" className="me-2">
            <button className="btn btn-dark profileButton">Search Chart</button>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-dark me-2 mb-3 profileButton"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
