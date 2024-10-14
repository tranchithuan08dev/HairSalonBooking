import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { fetchEmail } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setEmail(values);
    dispatch(fetchEmail(values)).then((res) => {
      if (res.payload.ok) {
        message.success("OTP SEND YOUR EMAIL");
        navigate("/resetpassword", { state: { email: values.email } });
      } else {
        message.error(`Failed `);
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card shadow-lg" style={{ width: "24rem" }}>
        <div className="card-header text-center h4 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-4 py-5">
          <p className="card-text mb-4 text-center">
            We’ll send you a One-Time Password (OTP) to verify your identity.
          </p>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          <div className="d-flex justify-content-between">
            <a href="#" className="text-decoration-none">
              Login
            </a>
            <a href="#" className="text-decoration-none">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
