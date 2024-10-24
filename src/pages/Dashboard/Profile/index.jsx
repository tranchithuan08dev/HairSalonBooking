import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Space,
  Image,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostManagerById,
  fetchUpdateManager,
} from "../../../store/dashbroadSlice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const dateFormat = "YYYY/MM/DD";

function Profile() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { postManagerById: dataManagerDetail } = useSelector(
    (state) => state.DASHBOARD
  );
  console.log("dataManagerDetail", dataManagerDetail);

  useEffect(() => {
    dispatch(fetchPostManagerById());
  }, [dispatch]);

  useEffect(() => {
    if (dataManagerDetail?.manager && dataManagerDetail?.user) {
      form.setFieldsValue({
        fullName: dataManagerDetail.manager.fullName,
        gender: dataManagerDetail.manager.gender,
        yob: dayjs(dataManagerDetail.manager.yob, dateFormat),
        phone: dataManagerDetail.user.phoneNumber,
        email: dataManagerDetail.user.email,
        address: dataManagerDetail.manager.address,
      });
      setAvatarUrl(dataManagerDetail.manager.avatar);
    }
  }, [dataManagerDetail, form]);

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
    const updateManager = {
      managerID: dataManagerDetail.manager.managerID,
      email: values.email,
      userID: dataManagerDetail.user.userID,
      avatar: selectedFile,
      phoneNumber: values.phone,
      gender: values.gender,
      address: values.address,
      yob: dayjs(values.yob).format(dateFormat),
    };
    dispatch(fetchUpdateManager(updateManager))
      .then(() => {
        message.success("Manager updated successfully!");
        dispatch(fetchPostManagerById());
      })
      .catch((error) => {
        message.error(`Failed to update manager: ${error.message}`);
      });
  };

  return (
    <Form
      form={form}
      {...layout}
      name="profile-form"
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
        name="fullName"
        label="Name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="yob" label="Date of Birth">
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender!" }]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please input your phone!" },
          { pattern: /^[0-9]{10}$/, message: "Enter a valid phone number!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Save Profile
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Profile;
