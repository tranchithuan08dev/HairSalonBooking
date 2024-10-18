import React from "react";

function Map() {
  return (
    <>
      <div className="container mx-auto py-8" style={{ marginBottom: "20px" }}>
        <div className="text-center mb-6">
          <h2 className="service-title text-3xl font-semibold text-black">
            Find Us
          </h2>
          <p className="text-gray-600">
            Locate us on the map and visit our Harmony Salon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Harmony Salon Address
            </h3>
            <p className="text-gray-700 mb-2">123 Harmony Street</p>
            <p className="text-gray-700 mb-2">Binh Thanh District</p>
            <p className="text-gray-700 mb-2">Ho Chi Minh City, Vietnam</p>
            <p className="text-gray-700">Phone: (0123) 456 789</p>
          </div>

          <div className="col-span-1 md:col-span-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105376067!2d106.80730271151613!3d10.841127589267007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1727717121372!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
