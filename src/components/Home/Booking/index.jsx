import React, { useEffect, useState } from "react";
import "./bookingButton.css";
import { Button, Drawer, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGuest } from "../../../store/bookingSlice";

function Booking() {
  const datatoken = localStorage.getItem("ACCESS_TOKKEN");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setToken(datatoken);
  }, [datatoken]);
  console.log(token);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (value) => {
    console.log("valuse", value);

    const createGuest = {
      phoneNumber: value.phoneNumber,
      fullName: value.fullName,
    };
    dispatch(fetchGuest(createGuest));
    navigate("/booking");
  };
  return (
    <>
      <div className="position-relative">
        <img
          src="/assets/image/logo_booking.jpg" // Ensure this path is correct
          alt="Logo-Booking"
          className="img-fluid-logo w-100 vh-100 blurred-image"
        />
        <div className="position-absolute top-50 start-50 translate-middle">
          {token ? (
            <Link to="/booking" className="btn-booking text-white">
              Booking
            </Link>
          ) : (
            <>
              <button className="btn-booking text-white" onClick={showDrawer}>
                Booking
              </button>
              <Drawer title="Booking Details" onClose={onClose} open={open}>
                <h4>Submit form to booking</h4>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Your Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Your Phone"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                      {
                        pattern: /^[0-9]{10,}$/,
                        message: "Please enter a valid phone number!",
                      },
                    ]}
                  >
                    <Input size="large" type="number" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-block"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      Booking
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Booking;
