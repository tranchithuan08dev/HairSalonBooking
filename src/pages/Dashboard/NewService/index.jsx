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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { fetchCreateService } from "../../../store/dashbroadSlice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function NewService() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
      })
      .catch((error) => {
        message.error(`Failed to create Service ${error}`);
      });
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

        <Form.Item name="price" label="Price">
          <InputNumber addonAfter="VND" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="duration" label="Duration">
          <InputNumber style={{ width: "100%" }} addonAfter="mins" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
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

export default NewService;
