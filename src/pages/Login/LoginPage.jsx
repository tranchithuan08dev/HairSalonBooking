import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { Login } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(Login(values)).then((res) => {
      if (res.payload.ok) {
        if (res.payload.data.currenInfor.record.role === "Manager") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        message.open({
          type: "error",
          content: "This is an error message",
        });
      }
    });
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#121231" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="../public/assets/image/login.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                      >
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">
                            Hairmony Salon
                          </span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account
                        </h5>

                        <Form.Item
                          label="Phone"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number!",
                            },
                            {
                              pattern: /^[0-9]{10}$/, // Assuming 10 digits for the phone number
                              message: "Phone number must be 10 digits!",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Phone" size="large" />
                        </Form.Item>

                        <Form.Item
                          label="PassWord"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password placeholder="Password" size="large" />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                          >
                            Login
                          </Button>
                        </Form.Item>

                        <Link to="/forgotPassword" className="small text-muted">
                          Forgot password?
                        </Link>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to={"/register"} style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
