import { Form, Button, Space, Image, Radio, Spin, Input } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function CreateNews() {
  const [isSpin, setIsSpin] = useState(false);
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [value, setValue] = useState("");

  const onFinish = (values) => {
    console.log("Form Submitted:", { ...values, content: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Form
      form={form}
      layout="vertical"
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
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title news!" }]}
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
      <Form.Item label="Content">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
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
  );
}

export default CreateNews;
