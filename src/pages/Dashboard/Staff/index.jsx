import { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Upload,
  Image,
  InputNumber,
  Tag,
  Radio,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const showLargeDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeImage = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const columns = [
    {
      title: "Stylist Name",
      dataIndex: "stylistname",
      key: "stylistname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hire Date",
      dataIndex: "hiredate",
      key: "hiredate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <span>
          <Button style={{ color: "blue" }} onClick={showLargeDrawer}>
            Detail
          </Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      stylistname: "Anna Nguyen",
      status: "active",
      phone: "0987654321",
      hiredate: "2021-01-15",
    },
    {
      key: "2",
      stylistname: "David Tran",
      status: "active",
      phone: "0978123456",
      hiredate: "2020-03-12",
    },
    {
      key: "3",
      stylistname: "Linh Pham",
      status: "active",
      phone: "0901234567",
      hiredate: "2019-07-18",
    },
    {
      key: "4",
      stylistname: "Mark Le",
      status: "active",
      phone: "0912345678",
      hiredate: "2022-05-23",
    },
    {
      key: "5",
      stylistname: "Sophia Vu",
      status: "active",
      phone: "0934567890",
      hiredate: "2021-10-09",
    },
    {
      key: "6",
      stylistname: "Huyen Dang",
      status: "active",
      phone: "0923456789",
      hiredate: "2020-11-11",
    },
    {
      key: "7",
      stylistname: "Minh Hoang",
      status: "active",
      phone: "0912345670",
      hiredate: "2022-06-13",
    },
    {
      key: "8",
      stylistname: "Thao Bui",
      status: "active",
      phone: "0934567123",
      hiredate: "2018-12-20",
    },
    {
      key: "9",
      stylistname: "James Nguyen",
      status: "active",
      phone: "0909876543",
      hiredate: "2019-03-15",
    },
    {
      key: "10",
      stylistname: "Lan Truong",
      status: "active",
      phone: "0923456701",
      hiredate: "2021-08-05",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Detail Stylist"
        placement="right"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
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
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Space>
          </Form.Item>
          <Form.Item name="staffname" label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="birth" label="Date of birth">
            <DatePicker
              defaultValue={dayjs("2004/08/08", dateFormat)}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="salary" label="Salary">
            <InputNumber />
          </Form.Item>
          <Form.Item name="hiredate" label="Hire Date">
            <DatePicker
              defaultValue={dayjs("2015/01/01", dateFormat)}
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
              Edit Service
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Staff;
