import React, { useEffect, useRef, useState } from "react";
import { getBadgeClass } from "../../../helpers/getBadgeClass";
import "../../../assets/css/staff/statusDropdown.css";

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const options = ["Cancelled", "Completed", "In-progress"];

  const filteredOptions = () => {
    if (currentStatus === "Done") {
      return options.filter(option => option !== "Cancelled" && option !== "In-progress");
    } else if (currentStatus === "In-progress") {
      return options.filter(option => option !== "Completed" && option !== "In-progress");
    } else if (currentStatus === "Cancelled" || currentStatus === "Completed") {
      return [];
    } else {
      return options.filter(option => option === currentStatus);
    }
  };

  const handleOptionClick = (status, event) => {
    event.stopPropagation();
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
      {isOpen && filteredOptions().length > 0 && (
        <div className="dropdown-options">
          {filteredOptions().map((status, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={(event) => handleOptionClick(status, event)}
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