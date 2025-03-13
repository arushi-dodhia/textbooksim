import React from 'react';
import { useNavigate } from 'react-router-dom';

function AllSimulators() {
  const navigate = useNavigate(); // ✅ Add navigation

  return (
    <div className="container">
      <h1>254 Calculators</h1>
      <div className="button-container">
        
        {/* Navigate to Binary Addition */}
        <div className="button-wrapper">
          <button className="custom-button" onClick={() => navigate("/calculate/addition")}>
            <span className="button-text">Addition</span>
            <span className="button-arrow">→</span>
          </button>
        </div>

        {/* Navigate to Binary Converter */}
        <div className="button-wrapper">
          <button className="custom-button" onClick={() => navigate("/binary-converter")}>
            <span className="button-text">Binary Conversions</span>
            <span className="button-arrow">→</span>
          </button>
        </div>

        {/* Navigate to IEEE 754 Converter */}
        <div className="button-wrapper">
          <button className="custom-button" onClick={() => navigate("/ieee-converter")}>
            <span className="button-text">IEEE 754</span>
            <span className="button-arrow">→</span>
          </button>
        </div>

      </div>
      
      <style>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .container h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .button-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .button-wrapper {
            display: flex;
          }
          .custom-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 15px;
            background-color: #e5e5e5;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .custom-button:hover {
            background-color: #d4d4d4;
            transform: scale(1.02);
          }
          .button-text {
            text-align: left;
            flex-grow: 1;
          }
          .button-arrow {
            font-size: 20px;
            color: #666;
          }
        `}
      </style>
    </div>
  );
}

export default AllSimulators;