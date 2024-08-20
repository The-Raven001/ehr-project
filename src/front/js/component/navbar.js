import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-end">
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-dark px-5 saveButton">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
