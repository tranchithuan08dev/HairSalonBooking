import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Upload,
  Space,
  Image,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const dateFormat = "YYYY/MM/DD";

function Profile() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const beforeUpload = (file) => {
    // Add validation logic for file before uploading
    return false;
  };

  const handleChangeImage = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world app
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Handle form submission
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
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
              showUploadList={false} // Hide default upload list
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
        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="birth" label="Date of Birth">
          <DatePicker
            defaultValue={dayjs("2004/08/08", dateFormat)}
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save Profile
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Profile;
