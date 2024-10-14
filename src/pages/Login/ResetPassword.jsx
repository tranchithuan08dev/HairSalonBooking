import React from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchResetPassWord } from "../../store/authSlice";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);

    const dataOtp = {
      email: email,
      otp: values.otp,
      newPassword: values.newPassword,
    };
    dispatch(fetchResetPassWord(dataOtp)).then((res) => {
      if (res.payload.ok) {
        message.success("ResetPassword successfully ");
        navigate("/login");
      } else {
        message.error(`Failed `);
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auth-container p-5 shadow-lg rounded-4 bg-white">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Reset Password
        </h2>
        <Form
          name="resetPasswordForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* OTP Input */}
          <Form.Item
            label="Enter OTP"
            name="otp"
            rules={[
              { required: true, message: "Please enter the OTP!" },
              { len: 6, message: "OTP must be 6 digits!" },
            ]}
          >
            <Input placeholder="6-digit OTP" size="large" />
          </Form.Item>

          {/* New Password Input */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter new password" size="large" />
          </Form.Item>

          {/* Confirm Password Input */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" size="large" />
          </Form.Item>

          {/* Reset Password Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
