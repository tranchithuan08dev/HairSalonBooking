import "../../../../assets/css/staff/salary.css";


  return (
    <>
      <div className="container test-container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 custom-tumlum">
          <div className="col-6">
            <div className="card radius-10 border-start border-0 border-3 border-info test-radius">
              <div className="card-body testcard-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total Appoinments</p>
                    <h2 className="my-1 text-info">21</h2>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card radius-10 border-start border-0 border-3 border-danger test-radius">
              <div className="card-body testcard-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total Revenue</p>
                    <h2 className="my-1 text-danger">123$</h2>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="fa fa-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row rowPay">
          <div className="col-12">
            <div
              className="card radius-10 border-start border-0 border-3 border-warning customPay"
              style={{ padding: "30px", minHeight: "250px" }}
            >
              <div className="card-body card-setting">
                <div className="d-flex align-items-center justify-content-between">
                  <h1
                    className="mb-0 text-secondary"
                    style={{ fontSize: "2.5rem" }}
                  >
                    Payday
                  </h1>
                  <h2
                    className="my-1 text-warning"
                    style={{ fontSize: "2rem" }}
                  >
                    10th of each month
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
