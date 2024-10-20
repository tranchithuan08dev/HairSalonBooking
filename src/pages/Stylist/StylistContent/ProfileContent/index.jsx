import { useEffect, useState } from "react";
import "../../../../assets/css/stylist/profile.css";
import React from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStylist,
  updateProfile,
  setData,
  setShowAlert,
} from "../../../../store/stylistSlice/ProfileSlice";
import dayjs from "dayjs";

function Content() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const stylistID = currentUser?.actorByRole.stylistID;

  const { data, loading, error, showAlert, message } = useSelector(
    (state) => state.STYLIST.profile
  );
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const resultAction = await dispatch(fetchStylist(stylistID)).unwrap();
      if (resultAction.ok && resultAction.data && resultAction.data.dob) {
        setDate(dayjs(resultAction.data.dob));
      }
    };
    fetch();
  }, [dispatch, stylistID]);

  const handleChangeDate = (date) => {
    setDate(date);
    dispatch(setData({ dob: date.format("YYYY-MM-DD") }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setData({ [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setData({ avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("before dispatch: ", data);
    const check = dispatch(updateProfile({ id: stylistID, data }));
    console.log(check);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-5 custom-mt5">
        <div
          className="row justify-content-center custom-rowJ"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          <div className="col-xl-6 test-col-6">
            <div className="card mb-4 mb-xl-0 test-mb4">
              <div className="card-header">Profile Picture</div>
              <div className="card-body d-flex flex-column align-items-center text-center">
                {data.avatar ? (
                  <img
                    name="avatar"
                    className="img-account-profile rounded-circle mb-2"
                    src={data.avatar}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                )}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="mb-0">User Account</h5>
              </div>
              <div className="card-body">
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputUserID">
                      UserID
                    </label>
                    <input
                      className="form-control"
                      id="inputUserID"
                      type="text"
                      name="userID"
                      defaultValue={data.userID}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhoneNumber">
                      PhoneNumber
                    </label>
                    <input
                      className="form-control"
                      id="inputPhoneNumber"
                      type="text"
                      name="phoneNumber"
                      defaultValue={data.phoneNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmail">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="text"
                      name="email"
                      defaultValue={data.email}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 test-col-6">
            <div className="card mb-4 test-mb4">
              <div className="card-header">User Information</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputStylistID">
                        StylistID
                      </label>
                      <input
                        className="form-control"
                        id="inputStylistID"
                        type="text"
                        name="stylistID"
                        defaultValue={data.stylistID}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="selectGender">
                        Gender
                      </label>
                      <select
                        id="selectGender"
                        className="form-select gender"
                        name="gender"
                        onChange={handleChange}
                        defaultValue={data.gender || ""}
                      >
                        <option defaultValue="" disabled>
                          Select your gender
                        </option>
                        <option
                          disabled={data.gender == "Male"}
                          defaultValue="Male"
                        >
                          Male
                        </option>
                        <option
                          disabled={data.gender == "Female"}
                          defaultValue="Female"
                        >
                          Female
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputFullName">
                      FullName
                    </label>
                    <input
                      className="form-control"
                      id="inputFullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your fullname"
                      defaultValue={data.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputAddress">
                      Address
                    </label>
                    <input
                      className="form-control"
                      id="inputAddress"
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      defaultValue={data.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Birthday
                    </label>{" "}
                    <br />
                    <DatePicker
                      className="form-control-date"
                      name="yob"
                      value={date}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleChangeDate}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="role">
                      Role:
                    </label>
                    <span
                      className="badge bg-warning text-dark"
                      style={{ marginLeft: "10px" }}
                    >
                      Stylist
                    </span>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
            {showAlert && (
              <div
                className={`alert ${
                  message ? "alert-success" : "alert-danger"
                } mt-3`}
                role="alert"
              >
                {message || error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
