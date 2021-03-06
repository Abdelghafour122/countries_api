import React from "react";
import { useNavigate } from "react-router-dom";
import Attribution from "./Attribution";
const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <div className="error container">
      <h1>Error, Page Not Found!</h1>
      <button
        onClick={() => {
          navigate("/countries_api");
        }}
      >
        Back to home
      </button>
      <Attribution />
    </div>
  );
};

export default ErrorPage;
