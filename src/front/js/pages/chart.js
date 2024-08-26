import React, { useState, useContext, useEffect } from "react";
import "../../styles/chart.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

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

      actions.getPrescriptions(patient.id);
      actions.getNotes(patient.id);
    }

    if (!patient) {
      alert("There is no patient to show");
      navigate("/search");
    }
  }, [store.patient, navigate]);

  const handleEditClick = () => {
    navigate("/edit-chart");
  };

  const navigateToAddDocument = () => {
    navigate("/add-document");
  };

  const navigateToAddPrescription = () => {
    navigate("/prescription-form");
  };

  const navigateToAddNote = () => {
    navigate("/add-note");
  };

  const handleEditPrescription = (prescriptionId) => {
    navigate(`/prescription-form/${prescriptionId}`);
  };

  const handleDeletePrescription = async (prescriptionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );
    if (confirmed) {
      await actions.deletePrescription(prescriptionId);
      actions.getPrescriptions(store.patient.id);
    }
  };

  return (
    <div className="patient-info">
      <Link to="/search">Back to search</Link>
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
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <div className="edit-button-container">
          <button
            className="edit-chart-button rounded bg-dark text-light"
            onClick={handleEditClick}
          >
            Edit Chart
          </button>
        </div>
      </div>
      <div className="patient-records row">
        <div className="section col-6">
          <div>
            <h4 className="d-flex justify-content-between">
              <strong>Documents</strong>
              <button
                onClick={navigateToAddDocument}
                className="add-item-button rounded d-flex justify-content-center"
              >
                <i
                  className="fa-solid fa-circle-plus me-3"
                  style={{ color: "#01060e" }}
                ></i>
              </button>
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
            <button
              onClick={navigateToAddPrescription}
              className="add-item-button rounded d-flex justify-content-center"
            >
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#01060e" }}
              ></i>
            </button>
          </h4>
          <ul>
            {store.prescriptions.map((prescription) => (
              <li key={prescription.id}>
                <div className="prescription-details">
                  <span>{prescription.name_of_medication}</span>
                  <span className="prescription-info">{`${prescription.quantity}mg, ${prescription.quantity_of_refills}x daily`}</span>
                </div>
                <button
                  className="edit-button mx-2 chartEditButton d-flex align-items-center"
                  onClick={() =>
                    navigate(`/edit-prescription/${prescription.id}`)
                  }
                >
                  <i
                    className="fa-solid fa-pencil me-2"
                    styleName="color: #000000;"
                  ></i>
                  Edit
                </button>
                <button
                  className="delete-button chartButtonDelete d-flex align-items-center"
                  onClick={() => handleDeletePrescription(prescription.id)}
                >
                  <i
                    className="fa-solid fa-trash-can me-2"
                    styleName="color: #000000;"
                  ></i>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="notes row">
        <div className="col-12">
          <h4 className="d-flex justify-content-between">
            <strong>Notes of interaction</strong>
            <button
              onClick={navigateToAddNote}
              className="add-item-button rounded d-flex justify-content-center"
            >
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#01060e" }}
              ></i>
            </button>
          </h4>
          <ul>
            {store.notes && store.notes.length > 0 ? (
              store.notes.map((note) => (
                <div key={note.id}>
                  <h5>{note.title}</h5>
                  <div className="border rounded mb-3">
                    <li>
                      <p>{note.content}</p>
                    </li>
                  </div>
                </div>
              ))
            ) : (
              <li>No notes available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
