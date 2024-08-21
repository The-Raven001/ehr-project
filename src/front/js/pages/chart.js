import React from "react";
import "../../styles/chart.css";

export const Chart = () => {
  return (
    <div class="patient-info">
      <div class="patient-header">
        <div class="patient-profile">
          <div class="patient-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Avatar"
            />
          </div>
          <div class="patient-details">
            <h3>John Doe</h3>
            <p>Chart #: 12345678</p>
          </div>
        </div>
        <div class="patient-summary">
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

      <div class="patient-records">
        <div class="section">
          <h4>Documents</h4>
          <ul>
            <li>
              <span>Medical History</span>
              <button class="view-button">View</button>
            </li>
            <li>
              <span>Lab Results</span>
              <button class="view-button">View</button>
            </li>
            <li>
              <span>Imaging Reports</span>
              <button class="view-button">View</button>
            </li>
          </ul>
        </div>
        <div class="section">
          <h4>Clinical Notes</h4>
          <ul>
            <li>
              <span>Physician Visit</span>
              <button class="view-button">View</button>
            </li>
            <li>
              <span>Nursing Notes</span>
              <button class="view-button">View</button>
            </li>
            <li>
              <span>Therapy Notes</span>
              <button class="view-button">View</button>
            </li>
          </ul>
        </div>
        <div class="section">
          <h4>Current Prescriptions</h4>
          <ul>
            <li>
              <div class="prescription-details">
                <span>Metformin</span>
                <span class="prescription-info">500mg, 2x daily</span>
              </div>
              <button class="refill-button">Refill</button>
            </li>
            <li>
              <div class="prescription-details">
                <span>Atorvastatin</span>
                <span class="prescription-info">10mg, 1x daily</span>
              </div>
              <button class="refill-button">Refill</button>
            </li>
            <li>
              <div class="prescription-details">
                <span>Lisinopril</span>
                <span class="prescription-info">20mg, 1x daily</span>
              </div>
              <button class="refill-button">Refill</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
