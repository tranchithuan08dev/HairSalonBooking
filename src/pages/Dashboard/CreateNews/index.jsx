import { Form, Button, Space, Image, Radio, Spin, Input, message } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateNews } from "../../../store/dashbroadSlice";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function CreateNews() {
  const [isSpin, setIsSpin] = useState(false);
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState("");
  const auth = useSelector((state) => state.AUTH.currentUser);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setIsSpin(true);
    const createNews = {
      img: selectedFile,
      managerID: auth?.actorByRole?.managerID,
      title: values.title,
      type: values.type,
      content: content,
    };
    console.log("create", createNews);

    dispatch(fetchCreateNews(createNews))
      .then(() => {
        message.success("News created successfully!");
        setIsSpin(false);
      })
      .catch((error) => {
        console.error("Error creating news:", error);
        message.error("Failed to create news. Please try again.");
        setIsSpin(false);
      });
    form.resetFields();
    setAvatarUrl(null);
    setContent("");
  };

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
          <Radio value="Store News">Store News</Radio>
          <Radio value="New Offers">New Offers</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Content">
        <ReactQuill theme="snow" value={content} onChange={setContent} />
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
