import { useEffect, useState } from "react";
import "../../../../assets/css/staff/profile.css";
import React from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaff,
  updateProfile,
  setData,
  setShowAlert,
} from "../../../../store/staffSlice/profileStaffSlice";
import dayjs from "dayjs";

function Content() {
  const dispatch = useDispatch();
  const { data, loading, error, showAlert, message } = useSelector(
    (state) => state.STAFF.profile
  );
  const { currentUser } = useSelector((state) => state.AUTH);
  console.log(currentUser);
  const staffID = currentUser?.actorByRole?.staffID;
  const [date, setDate] = useState(dayjs());
  const [hasChanges, setHasChanges] = useState(false);

  const [avatarFile, setAvatarFile] = useState();

  const fetch = async () => {
    const resultAction = await dispatch(fetchStaff(staffID)).unwrap();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setData({ [name]: value }));
    setHasChanges(true);
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected File:", file);
    setAvatarFile(file);
    setHasChanges(true);
    }
  };

  const getDateOnly = (isoDate) => {
    return dayjs(isoDate).format("YYYY-MM-DD");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!hasChanges){
      alert("No changes to save!");
    }

    const formData = new FormData();
    const dataToUpdate = {
      userID: data.userID,
      staffID: data.staffID,
      gender: data.gender,
      dob: getDateOnly(data.dob),
      fullName: data.fullName,
      address: data.address,
      email: data.email,
      phoneNumber: data.phoneNumber
    };

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    for (const key in dataToUpdate) {
      formData.append(key, dataToUpdate[key]);
    }
    
    const formDataObj = Object.fromEntries(formData.entries());
    console.log("form", formDataObj);
    const result = await dispatch(updateProfile({ id: staffID, data: formData }));
    if(result.payload.ok){
      fetch();
    }
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
                      className="img-account-profile rounded-circle avatarStaff mb-2"
                      src={data.avatar}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="img-account-profile rounded-circle avatarStaff mb-2"
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
                        defaultValue={data.email || ""}
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
                      <label className="small mb-1" htmlFor="inputStaffID">
                        StaffID
                      </label>
                      <input
                        className="form-control"
                        id="inputStaffID"
                        type="text"
                        name="staffID"
                        defaultValue={data.staffID || ""}
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
                      name="dob"
                      defaultValue={date}
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
                      Staff
                    </span>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Save changes
                  </button>
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
        </form>
      </div>
    </>
  );
}

export default Content;
