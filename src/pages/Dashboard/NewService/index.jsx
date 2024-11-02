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
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { fetchCreateService } from "../../../store/dashbroadSlice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function NewService() {
  const [isSpin, setIsSpin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl); // Set the avatar preview
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input dialog
  };

  const onFinish = (values) => {
    setIsSpin(true);
    const createService = {
      img: selectedFile,
      serviceName: values.serviceName,
      type: values.type,
      price: values.price,
      duration: values.duration,
      description: values.description,
    };

    dispatch(fetchCreateService(createService))
      .then(() => {
        message.success("Create Service successfully!");
        setIsSpin(false);
      })
      .catch((error) => {
        message.error(`Failed to create Service ${error}`);
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
          label="Service Name"
          rules={[
            { required: true, message: "Please input the service name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select the type!" }]}
        >
          <Radio.Group>
            <Radio value="single">Single</Radio>
            <Radio value="combo">Combo</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the price" },
            {
              type: "number",
              min: 0,
              message: "Price must be a positive number",
            },
          ]}
        >
          <InputNumber addonAfter="USD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            { required: true, message: "Please enter the duration" },
            {
              type: "number",
              min: 1,
              max: 90,
              message: "Duration must be at least 1 minute",
            },
          ]}
        >
          <InputNumber addonAfter="mins" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter a description" },
            { max: 200, message: "Description cannot exceed 200 characters" },
          ]}
        >
          <TextArea rows={4} />
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

export default NewService;
