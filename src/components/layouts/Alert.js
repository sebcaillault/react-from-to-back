import React from "react";

const Alert = ({ alert }) => {
  return (
    alert != null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle"></i>
        <span style={{ display: "inline-block", marginLeft: "5px" }}>
          {alert.message}
        </span>
      </div>
    )
  );
};

export default Alert;
