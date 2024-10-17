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

function NewStylist() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  const dispatch = useDispatch();

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
    const createStylist = {
      role: "Stylist",
      avatar: selectedFile,
      fullName: values.stylistName,
      email: values.email,
      yob: values.yob.format(dateFormat),
      address: values.address,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      certificateURL: values.certificate,
      level: values.level,
      password: "1111",
    };
    dispatch(fetchCreate(createStylist))
      .then(() => {
        message.success("Create Stylist successfully!");
      })
      .catch((error) => {
        message.error(`Failed to create Stylist ${error}`);
      });
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        {...layout}
        name="new-stylist"
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
          name="stylistName"
          label="Stylist Name"
          rules={[
            { required: true, message: "Please input the stylist name!" },
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
        <Form.Item name="certificate" label="Link Image Certificate">
          <Input />
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

export default NewStylist;
