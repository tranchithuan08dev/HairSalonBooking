import React, { useEffect, useRef, useState } from "react";
import { getBadgeClass } from "../../../helpers/getBadgeClass";
import "../../../assets/css/staff/statusDropdown.css";

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const options = ["Cancelled", "Done", "Completed", "In-progress"];

  const handleOptionClick = (status) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="status-dropdown" ref={dropdownRef}>
      <span
        className={`badge ${getBadgeClass(currentStatus)}`}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{ cursor: "pointer" }}
      >
        {currentStatus}
      </span>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((status, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(status)}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
