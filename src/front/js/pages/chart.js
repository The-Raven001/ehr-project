import React from "react";
import "../../styles/chart.css";

export const Chart = () => {
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
            <h3>John Doe</h3>
            <p>Chart #: 12345678</p>
          </div>
        </div>
        <div className="patient-summary">
          <p>
            <strong>Date of Birth:</strong> 05/15/1985
          </p>
          <p>
            <strong>Insurance:</strong> Blue Cross Blue Shield
          </p>
          <p>
            <strong>Primary Pharmacy:</strong> Walgreens
          </p>
        </div>
      </div>

      <div className="patient-records row">
        <div className="section col-6">
          <div>
            <h4 className="d-flex justify-content-between">
              <strong>Documents{""}</strong>
              <i
                className="fa-solid fa-circle-plus me-3"
                styleName="color: #01060e;"
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
              styleName="color: #01060e;"
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
              styleName="color: #01060e;"
            ></i>
          </h4>
          <ul>
            <li>
              <h5>Title of note</h5>
              <p>
                Those will be the notes of the provide or any employee for the
                clinic
                weljghwenhwgkhwrgnhkwrgbwrhgrkhlgwkgwkhlwrhklgrwhkghwglglwr
              </p>
            </li>
            <li>
              <h5>Title of note</h5>
              <p>
                Those will be the notes of the provide or any employee for the
                clinic
              </p>
            </li>
            <li>
              <h5>Title of note</h5>
              <p>
                Those will be the notes of the provide or any employee for the
                clinic
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
