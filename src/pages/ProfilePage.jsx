import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Radio,
  Space,
  Form,
  Image,
  DatePicker,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../store/authSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  fetchPostCustomerById,
  fetchUpdateCustomer,
} from "../store/dashbroadSlice";
import dashboardService from "../services/dashboardService";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";
function ProfilePage() {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const auth = useSelector((state) => state.AUTH.currentUser);

  const token = localStorage.getItem("ACCESS_TOKKEN");
  const customerId = auth?.actorByRole?.customerID;
  console.log("UserId", customerId);

  const dataCustomerDetail = useSelector(
    (state) => state.DASHBOARD.postCustomerById
  );
  console.log("dataCustomerDetail", dataCustomerDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe(token));
    dispatch(fetchPostCustomerById(customerId));
  }, [dispatch]);
  useEffect(() => {
    if (dataCustomerDetail) {
      form.setFieldsValue({
        fullName: dataCustomerDetail.customer?.fullName,
        phoneNumber: dataCustomerDetail.user?.phoneNumber,
        email: dataCustomerDetail.user?.email,
        point: dataCustomerDetail.customer?.loyaltyPoints,
        yob: dayjs(dashboardService.customer?.yob),
        gender: dataCustomerDetail.customer?.gender,
      });
      setAvatarUrl(dataCustomerDetail.customer?.avatar);
    }
  }, [dataCustomerDetail, form]);
  //Image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFinish = (values) => {
    const updateCustomer = {
      userID: dataCustomerDetail?.user?.userID,
      customerID: customerId,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      avatar: selectedFile,
      gender: values.gender,
      yob: values.yob.format(dateFormat),
      email: values.email,
    };

    dispatch(fetchUpdateCustomer(updateCustomer))
      .then(() => {
        message.success("Updated successfully!");
      })
      .catch((error) => {
        message.error(`Failed to update : ${error.message}`);
      });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Header />
      <h2 className="name text-center p-3">Profile</h2>
      <div className="container d-flex justify-content-center mb-4 ">
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          className="w-100 shadow-lg" // Allows the form to take full width if needed
          style={{
            maxWidth: "600px",

            padding: "10px",
          }}
        >
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <div className="d-flex align-items-center">
              <Image
                width={200}
                src={avatarUrl || "https://via.placeholder.com/200"}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "200px",
                  height: "200px",
                }}
              />
              <div className="ms-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Button icon={<UploadOutlined />} onClick={handleUploadClick}>
                  Upload Avatar
                </Button>
              </div>
            </div>
          </Form.Item>

          <Form.Item name="fullName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits!",
              },
            ]}
          >
            <Input type="text" placeholder="Phone" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not a valid email!",
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="yob" label="Date of birth">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="point" label="Loyalty Points">
            <Input disabled />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 4,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
