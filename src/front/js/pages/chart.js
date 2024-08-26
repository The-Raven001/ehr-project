import React, { useState, useContext, useEffect } from "react";
import "../../styles/chart.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import UploadDocsForm from "../component/uploadDocsForm";

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
  const [documents, setDocuments] = useState({
    medical: "",
    lab: "",
    imaging: "",
  });

  const fetchDocuments = async () => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/media/${store.patient.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (!data) {
        return;
      }
      const updatedDocuments = { medical: "", lab: "", imaging: "" };

      data.forEach((doc) => {
        if (doc.document_type === "medical_history") {
          updatedDocuments.medical = doc.url;
        } else if (doc.document_type === "lab_results") {
          updatedDocuments.lab = doc.url;
        } else if (doc.document_type === "imaging_reports") {
          updatedDocuments.imaging = doc.url;
        }
      });

      setDocuments(updatedDocuments);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [store.patient]);

  const handleUploadComplete = (message) => {
    fetchDocuments();
    alert(message);
  };

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
    }

    if (!patient) {
      alert("There is no patient to show");
      navigate("/search");
    }
  }, [store.patient, navigate]);

  const handleEditClick = () => {
    navigate("/protected/edit-chart");
  };

  const navigateToAddPrescription = () => {
    navigate("/protected/prescription-form");
  };

  const navigateToAddNote = () => {
    navigate("/protected/add-note");
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
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Email:</strong> {email}
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
              <button
                type="button"
                className="add-item-button rounded d-flex justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#uploadDocsModal"
              >
                <i
                  className="fa-solid fa-circle-plus me-3"
                  style={{ color: "#01060e" }}
                ></i>
              </button>

              <div
                className="modal fade"
                id="uploadDocsModal"
                tabindex="-1"
                aria-labelledby="uploadDocsModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Upload File
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <UploadDocsForm onUploadComplete={handleUploadComplete} />
                    </div>
                  </div>
                </div>
              </div>
            </h4>
          </div>
          <ul>
            <li>
              <span>Medical History</span>

              <a className="btn btn-dark" href={documents.medical}>
                View
              </a>
            </li>
            <li>
              <span>Lab Results</span>

              <a className="btn btn-dark" href={documents.lab}>
                View
              </a>
            </li>
            <li>
              <span>Imaging Reports</span>

              <a className="btn btn-dark" href={documents.imaging}>
                View
              </a>
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
                <button className="edit-button mx-2">Edit</button>
                <button className="delete-button">Delete</button>
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
