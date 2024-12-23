import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Space,
  Image,
  InputNumber,
  message,
  DatePicker,
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { fetchCreate } from "../../../store/dashbroadSlice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function NewStaff() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [isSpin, setIsSpin] = useState(false);
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      console.log("img", imageUrl);

      setAvatarUrl(imageUrl); // Set the avatar preview
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input dialog
  };

  const onFinish = (values) => {
    setIsSpin(true);
    const createStaff = {
      role: "Staff",
      password: "1111",
      fullName: values.staffName,
      avatar: selectedFile,
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      dob: values.yob.format(dateFormat),
    };

    console.log("createStaff", createStaff);

    dispatch(fetchCreate(createStaff))
      .then(() => {
        message.success("Create staff successfully!");
        setIsSpin(false);
      })
      .catch((error) => {
        message.error(`Failed to staff Stylist ${error}`);
        setIsSpin(false);
      });
    form.resetFields();
    setAvatarUrl(null);
  };

  return (
    <>
      <Form
        form={form}
        {...layout}
        name="new-staff"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space size={12}>
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
            <div>
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
          </Space>
        </Form.Item>

        <Form.Item
          name="staffName"
          label="Staff Name"
          rules={[{ required: true, message: "Please input the staff name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="yob"
          label="Date of birth"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
        >
          <DatePicker format={dateFormat} />
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
              required: true,
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

        <Form.Item
          name="address"
          label="Address"
          rules={[
            { required: true, message: "Please enter your address" },
            { max: 250, message: "Address cannot exceed 250 characters" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {isSpin && (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                size="small"
              />
            )}
            Create Service
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewStaff;
