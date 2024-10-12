import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Upload,
  Image,
  Tag,
  Radio,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostStaff,
  fetchPostStaffDetailById,
} from "../../../store/dashbroadSlice";

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
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [form] = Form.useForm();
  const dataStaff = useSelector((state) => state.DASHBOARD.postStaff);
  const dataStaffDetail = useSelector(
    (state) => state.DASHBOARD.postStaffDetailById
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostStaff());
  }, [dispatch]);

  if (dataStaff == null) {
    return <></>;
  }

  useEffect(() => {
    if (dataStaffDetail) {
      form.setFieldsValue({
        fullName: dataStaffDetail.fullName,
        gender: dataStaffDetail.gender,
        yob: dayjs(dataStaffDetail.yob),
        phoneNumber: dataStaffDetail.phoneNumber,
        email: dataStaffDetail.email,
        address: dataStaffDetail.address,
        level: dataStaffDetail.level,
        status: dataStaffDetail.deleted,
      });
    }
  }, [dataStaffDetail, form]);
  console.log("gender", dataStaffDetail?.gender);
  console.log("dataDetail", dataStaffDetail);

  const showLargeDrawer = (staffId) => {
    setSelectedStylist(staffId);
    dispatch(fetchPostStaffDetailById(staffId));
    setOpen(true);
  };

  const onClose = () => {
    setSelectedStylist(null);
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
      title: "Staff Name",
      dataIndex: "staffname",
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
      render: (_, record) => (
        <span>
          <Button
            style={{ color: "blue" }}
            onClick={() => showLargeDrawer(record.key)}
          >
            Detail
          </Button>
        </span>
      ),
    },
  ];

  const data = dataStaff.map((index, i) => ({
    key: index.id || `staff-${i}`,
    staffname: index.fullName,
    status: index.deleted ? "Inactive" : "Active",
    phone: index.phone,
    hiredate: index.hireDate,
  }));

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
          form={form}
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
          <Form.Item name="fullName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
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
          <Form.Item name="yob" label="Date of birth">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update Staff
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Staff;
