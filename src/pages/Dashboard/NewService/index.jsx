import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Upload,
  Space,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const dateFormat = "YYYY/MM/DD";

function NewService() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isSmallEnough = file.size / 1024 / 1024 < 2; // Less than 2MB

    if (!isImage) {
      alert("You can only upload image files!");
    } else if (!isSmallEnough) {
      alert("Image must be smaller than 2MB!");
    }
    return isImage && isSmallEnough;
  };

  const handleChangeImage = (info) => {
    if (info.file.status === "done" || !info.file.status) {
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      birth: values.birth ? dayjs(values.birth).format(dateFormat) : null,
    };
    console.log("Form Values:", formattedValues);
    // Handle form submission logic here
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
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
            <Upload
              name="file"
              beforeUpload={beforeUpload}
              onChange={handleChangeImage}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item
          name="staffname"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
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

        <Form.Item name="birth" label="Date of Birth">
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Save Profile
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewService;
