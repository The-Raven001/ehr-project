import React, { useState, useContext, useEffect } from "react";
import "../../styles/chart.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Chart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [chart, setChart] = useState("");
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [insurance, setInsurance] = useState("");
  const [pharmacy, setPharmacy] = useState("");

  useEffect(() => {
    const patient = store.patient;

    if (patient) {
      setChart(patient.chart);
      setName(patient.name);
      setMiddleName(patient.middle_name);
      setLastName(patient.last_name);
      setEmail(patient.email);
      setPhone(patient.phone_number);
      setDob(patient.dob);
      setInsurance(patient.name_of_insurance);
      setPharmacy(patient.name_of_pharmacy);
    }

    if (!patient) {
      alert("There is no patient to show");
      navigate("/search");
    }
  }, [store.patient]);

  const handleEditClick = () => {
    navigate(`/edit-chart`);
  };

  return (
    <div className="patient-info">
      <div className="patient-header">
        <div className="patient-profile">
          <div className="patient-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Avatar"
            />
          </div>
          <div className="patient-details">
            <h3>{`${name} ${middleName} ${lastName}`}</h3>
            <p>Chart #: {chart}</p>
          </div>
        </div>
        <div className="patient-summary">
          <p>
            <strong>Date of Birth:</strong> {dob}
          </p>
          <p>
            <strong>Insurance:</strong> {insurance}
          </p>
          <p>
            <strong>Primary Pharmacy:</strong> {pharmacy}
          </p>
          <p>
            <strong>Phone</strong> {phone}
          </p>
          <p>
            <strong>Email</strong> {email}
          </p>
        </div>
        <div className="edit-button-container">
          <button className="edit-chart-button" onClick={handleEditClick}>
            Edit Chart
          </button>
        </div>
      </div>

      <div className="patient-records row">
        <div className="section col-6">
          <div>
            <h4 className="d-flex justify-content-between">
              <strong>Documents</strong>
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#01060e" }}
              ></i>
            </h4>
          </div>
          <ul>
            <li>
              <span>Medical History</span>
              <button className="view-button">View</button>
            </li>
            <li>
              <span>Lab Results</span>
              <button className="view-button">View</button>
            </li>
            <li>
              <span>Imaging Reports</span>
              <button className="view-button">View</button>
            </li>
          </ul>
        </div>
        <div className="section col-6">
          <h4 className="d-flex justify-content-between">
            <strong>Current Prescriptions</strong>
            <i
              className="fa-solid fa-circle-plus me-3"
              style={{ color: "#01060e" }}
            ></i>
          </h4>
          <ul>
            <li>
              <div className="prescription-details">
                <span>Metformin</span>
                <span className="prescription-info">500mg, 2x daily</span>
              </div>
              <button className="edit-button mx-2">Edit</button>
              <button className="delete-button">Delete</button>
            </li>
            <li>
              <div className="prescription-details">
                <span>Atorvastatin</span>
                <span className="prescription-info">10mg, 1x daily</span>
              </div>
              <button className="edit-button mx-2">Edit</button>
              <button className="delete-button">Delete</button>
            </li>
            <li>
              <div className="prescription-details">
                <span>Lisinopril</span>
                <span className="prescription-info">20mg, 1x daily</span>
              </div>
              <button className="edit-button mx-2">Edit</button>
              <button className="delete-button">Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="notes row">
        <div className="col-12">
          <h4 className="d-flex justify-content-between">
            <strong>Notes of interaction</strong>
            <i
              className="fa-solid fa-circle-plus me-3"
              style={{ color: "#01060e" }}
            ></i>
          </h4>
          <ul>
            <li>
              <h5>Title of note</h5>
              <p>
                These will be the notes of the provider or any employee for the
                clinic.
              </p>
            </li>
            <li>
              <h5>Title of note</h5>
              <p>
                These will be the notes of the provider or any employee for the
                clinic.
              </p>
            </li>
            <li>
              <h5>Title of note</h5>
              <p>
                These will be the notes of the provider or any employee for the
                clinic.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
