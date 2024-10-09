import { Checkbox, Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { Register } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Form Values:", values);
    dispatch(Register(values)).then((res) => {
      if (res.payload.ok) {
        navigate("/");
      } else {
      }
    });
  };

  return (
    <>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
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
                      <Form.Item
                        label="Your Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email address!",
                          },
                        ]}
                      >
                        <Input size="large" type="email" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password size="large" />
                      </Form.Item>

                      <Form.Item
                        label="Repeat your password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("The two passwords do not match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password size="large" />
                      </Form.Item>

                      <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                          {
                            validator: (_, value) =>
                              value
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error("You must agree to the terms!")
                                  ),
                          },
                        ]}
                      >
                        <Checkbox>
                          I agree to all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </Checkbox>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-block"
                          size="large"
                          style={{ width: "100%" }}
                        >
                          Register
                        </Button>
                      </Form.Item>
                    </Form>

                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account?{" "}
                      <a href="#!" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
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

export default RegisterPage;
