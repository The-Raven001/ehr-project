import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div class="container bg-light maindiv landing mt-5">
      <div class="text-content textlanding">
        <h1>Secure and Intuitive EHR System</h1>
        <p>
          Streamline your healthcare workflows with our cutting-edge EHR system.
          Secure data storage, intuitive interface, and seamless integration -
          all in one platform.
        </p>
        <div class="buttons buttonslanding">
          <button class="btn btn-dark btnslanding saveButton">
            Request Demo
          </button>
          <Link to="/signup">
            <button class="btn btn-dark btnslanding saveButton">Sign Up</button>
          </Link>
        </div>
      </div>
      <div class="image-content maindiv border-rounded">
        <img
          src="https://cdn.medifind.com/wp/2020/08/31184653/00_3_8-Major-Problems-with-the-US-Healthcare-System-Today_hero-768x510.png"
          alt="Healtcare image"
        ></img>
      </div>
    </div>
  );
};
