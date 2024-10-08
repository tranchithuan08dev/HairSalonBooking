import "../../../../assets/css/profile.css";


function Content() {
  return (
    <>
      <div className="container mt-5 custom-mt5">
        <div className="row justify-content-center custom-rowJ" style={{ maxWidth: "1200px", width: "100%" }}>
          <div className="col-xl-6 test-col-6">
            <div className="card mb-4 mb-xl-0 test-mb4">
              <div className="card-header">Profile Picture</div>
              <div className="card-body d-flex flex-column align-items-center text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="Profile"
                />
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <button className="btn btn-primary" type="button">
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-6 test-col-6">
            <div className="card mb-4 test-mb4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputFullName">
                      FullName
                    </label>
                    <input
                      className="form-control"
                      id="inputFullName"
                      type="text"
                      placeholder="Enter your fullname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      defaultValue="name@example.com"
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        defaultValue="555-123-4567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        defaultValue="06/10/1988"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="gender">
                      Gender
                    </label>
                    <select id="gender" className="form-select">
                      <option value="" disabled>
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="role">
                      Role:
                    </label>
                    <span
                      className="badge bg-warning text-dark"
                      style={{ marginLeft: "10px" }}
                    >
                      Staff
                    </span>
                  </div>
                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
