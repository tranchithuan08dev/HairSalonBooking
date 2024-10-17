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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
    const createStylist = {
      img: selectedFile,
      serviceName: values.serviceName,
      type: values.type,
      price: values.price,
      duration: values.duration,
      description: values.description,
    };
  };

  return (
    <>
      <Form
        {...layout}
        name="new-service"
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
          name="serviceName"
          label="Stylist Name"
          rules={[
            { required: true, message: "Please input the service name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="yob" label="Date of birth">
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

        <Form.Item name="address" label="Address">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="level" label="Level">
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Create Service
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewStaff;
