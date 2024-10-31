import React from "react";

function SroteSpace() {
  return (
    <>
      <div
        className="bg-secondary-subtle p-0"
        style={{ marginBottom: "-20px" }}
      >
        <div className="container mx-auto" style={{ marginTop: 0 }}>
          <div className="text-center" style={{ paddingBottom: 10 }}>
            <h2 className="service-title text-black">Store Space</h2>
          </div>
          {/* Large image */}
          <div className="row mb-3">
            <div className="col-12">
              <img
                src="../public/assets/image/storeSpace1.jpg"
                alt="Large Image"
                className="img-fluid rounded-3 border border-primary"
                style={{
                  maxHeight: 400,
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
          </div>
          {/* Three smaller images */}
          <div className="row" style={{ paddingBottom: 60 }}>
            <div className="col-md-4">
              <img
                src="../public/assets/image/storeSpace2.jpg"
                alt="Small Image 1"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: 200,
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
            <div className="col-md-4">
              <img
                src="../assets/image/store3.jpg"
                alt="Small Image 2"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: 200,
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
            <div className="col-md-4">
              <img
                src="../public/assets/image/storeSpace3.jpg"
                alt="Small Image 3"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: 200,
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SroteSpace;
