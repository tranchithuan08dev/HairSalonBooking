import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { fetchChangePassword } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

function ChangePasswordPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log("Form values:", values);
    dispatch(fetchChangePassword(values))
      .then((res) => {
        if (res.payload.ok) {
          message.success("Password changed successfully!");
          navigate("/login"); // Redirect to login page after success
        } else {
          // Trigger message for specific cases where `ok` is false
          message.error("Failed to change password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log error for debugging
        message.error("Failed to change password. Please try again.");
      });
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1641230846322-caa4939d2cb1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "10px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "400px",
  };

  const buttonStyle = {
    backgroundColor: "#454548",
    borderColor: "#454548",
    transition: "all 0.3s ease",
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <Title level={3} className="text-center mb-4" style={{ color: "#333" }}>
          Change Password
        </Title>
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="password"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={buttonStyle}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#333";
                e.target.style.borderColor = "#333";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#454548";
                e.target.style.borderColor = "#454548";
              }}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
