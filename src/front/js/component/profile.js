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
    <div className="bg-light d-flex justify-content-center align-items-center flex-column">
      <h1>Profile</h1>
      <p>Welcome {store.user ? store.user.name : ""}</p>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      <Link to="/protected/edit-profile">
        <button className="btn btn-dark">Edit Profile</button>
      </Link>
      <Link to="/protected/search">
        <button className="btn btn-dark">Search Chart</button>
      </Link>
    </div>
  );
};
