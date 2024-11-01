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
  setError,
} from "../../../../store/stylistSlice/ProfileSlice";
import dayjs from "dayjs";

function Content() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const stylistID = currentUser?.actorByRole.stylistID;

  const { data, loading, error, showAlert, message } = useSelector(
    (state) => state.STYLIST.profile
  );
  const [date, setDate] = useState(dayjs());
  const [avatarFile, setAvatarFile] = useState();
  const [hasChanges, setHasChanges] = useState(false);

  const fetch = async () => {
    const resultAction = await dispatch(fetchStylist(stylistID)).unwrap();
    if (resultAction.ok && resultAction.data) {
      if (resultAction.data.dob) {
        setDate(dayjs(resultAction.data.dob));
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);

  const handleChangeDate = (dateIn) => {
    if (dateIn) {
      setDate(dateIn);
      dispatch(setData({ dob: dateIn.format("YYYY-MM-DD") }));
      setHasChanges(true);
    }
  };

  const getDateOnly = (isoDate) => {
    return dayjs(isoDate).format("YYYY-MM-DD");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setData({ [name]: value }));
    setHasChanges(true);
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setHasChanges(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) {
      dispatch(setShowAlert(true));
      dispatch(setError("No changes to save!"));
      return;
  }
    const formData = new FormData();
    const dataToUpdate = {
      userID: data.userID,
      stylistID: data.stylistID,
      gender: data.gender,
      dob: getDateOnly(data.dob),
      fullName: data.fullName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
    };

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    for (const key in dataToUpdate) {
      formData.append(key, dataToUpdate[key]);
    }
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    const result = await dispatch(
      updateProfile({ id: stylistID, data: formData })
    );
    if (result.payload.ok) fetch();
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
      {showAlert && (
        <div
          className={`alert ${message ? "alert-success" : "alert-danger"} mt-3`}
          role="alert"
        >
          {message || error}
        </div>
      )}
      <div className="container mt-5 custom-mt5">
        <form onSubmit={handleSubmit}>
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
                      className="img-account-profile rounded-circle avatarStylist mb-2"
                      src={data.avatar}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="img-account-profile rounded-circle avatarStylist mb-2"
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
                        defaultValue={data.userID || ""}
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
                        defaultValue={data.phoneNumber || ""}
                        disabled
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
                        disabled
                        onChange={handleChange}
                        defaultValue={data.email ? data.email : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 test-col-6">
              <div className="card mb-4 test-mb4">
                <div className="card-header">
                  <h5 className="mb-0">User Information</h5>
                </div>
                <div className="card-body">
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
                        defaultValue={data.stylistID || ""}
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
                        <option
                          disabled={data.gender == "Other"}
                          defaultValue="Other"
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFullName">
                        HireDate
                      </label>
                      <input
                        className="form-control"
                        id="inputHireDate"
                        type="text"
                        name="hireDate"
                        defaultValue={getDateOnly(data.hireDate)}
                        disabled
                      />
                    </div>
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
                      name="dob"
                      defaultValue={date}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleChangeDate}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="role">
                        Level
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="level"
                        defaultValue={data.level || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Save changes
                  </button>
                </div>
              </div>
              {data.certificateURL && (
                <div
                  className="card"
                  style={{
                    width: "450px",
                    height: "200px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="card-body"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src=""
                      alt="Certificate Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Content;
