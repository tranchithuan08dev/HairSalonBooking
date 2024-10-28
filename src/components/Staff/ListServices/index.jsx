import React, { useState } from "react";

const ListServices = (props) => {
  const { detail, services, addService, isPaid } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(
    detail.servicesName || []
  );

  const singleServices = services.filter(
    (s) => s.type === "single" && !s.deleted
  );
  const comboServices = services.filter(
    (s) => s.type === "combo" && !s.deleted
  );

  const handleServicesOpen = () => setIsModalOpen(true);
  const handleModalClose = (isSave) => {
    if(!isSave){
      setSelectedServices(detail.servicesName || "");
    }
    setIsModalOpen(false);
  };

  const handleServiceChange = (service) => {
    setSelectedServices((prev) => {
      const serviceName = service.serviceName;
      const newSelected = prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]; 

      return newSelected;
    });
  };

  const handleAddServices = () => {
    if (selectedServices.length > 0) {
        const filteredServices = services.filter((service) =>
            selectedServices.includes(service.serviceName)
        );
        const serviceDetails = filteredServices.filter((service) => service.serviceID);

        console.log("Selected Services:", serviceDetails);
        
        const totalPrice = serviceDetails.reduce((acc, detail) => acc + parseFloat(detail.price || 0), 0);

        const result = serviceDetails.map(service => service.serviceID); 
        result.push(totalPrice); 

        console.log("Result:", result);
        addService(result); 
        handleModalClose(true);
    }
};


  const getDisplayServices = () => {
    if (selectedServices.length === 0) return "No services selected";
    if (selectedServices.length > 5) {
      return [...selectedServices.slice(0, 5), "..."].join(", ");
    }
    return selectedServices.join(", ");
  };
  return (
    <div className="form-group textDiv">
      <strong>Services:</strong>
      <textarea
        name="servicesName"
        defaultValue={getDisplayServices()}
        readOnly={isPaid}
        rows={4}
        className="form-control text"
      />
      {!isPaid && (
        <label className="add-more-label" onClick={handleServicesOpen}>
          Add or Remove Services
        </label>
      )}

      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <h2>Select Services</h2>
            <h6>Note: Choose at least 1 service</h6>
            <div className="services-container">
              <div className="service-column">
                <h3>Single Services</h3>
                {singleServices.map((service) => (
                  <div key={service.serviceID} className="service-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.serviceName)}
                        onChange={() => handleServiceChange(service)}
                      />
                      {service.serviceName}
                    </label>
                  </div>
                ))}
              </div>

              <div className="service-column">
                <h3>Combo Services</h3>
                {comboServices.map((service) => (
                  <div key={service.serviceID} className="service-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.serviceName)}
                        onChange={() => handleServiceChange(service)}
                      />
                      {service.serviceName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {selectedServices.length > 0 && (
              <div className="modal-actions">
                <button onClick={handleAddServices}>Save Changes</button>
                <button onClick={handleModalClose}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListServices;
