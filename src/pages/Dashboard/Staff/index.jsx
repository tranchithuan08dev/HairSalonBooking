import { useEffect, useRef, useState } from "react";
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
  message, // <-- Import message from antd
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostStaff,
  fetchPostStaffDetailById,
  fetchUpdateStaff,
} from "../../../store/dashbroadSlice";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Staff = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [form] = Form.useForm();

  const dataStaff = useSelector((state) => state.DASHBOARD.postStaff);
  const dataStaffDetail = useSelector(
    (state) => state.DASHBOARD.postStaffDetailById
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostStaff());
  }, [dispatch]);

  useEffect(() => {
    if (dataStaffDetail) {
      form.setFieldsValue({
        fullName: dataStaffDetail.fullName,
        gender: dataStaffDetail.gender,
        yob: dayjs(dataStaffDetail.yob),
        phoneNumber: dataStaffDetail.phoneNumber,
        email: dataStaffDetail.email,
        address: dataStaffDetail.address,
        status: dataStaffDetail.deleted,
      });
      setAvatarUrl(dataStaffDetail.avatar || "");
    }
  }, [dataStaffDetail, form]);

  const showLargeDrawer = (staffId) => {
    setSelectedStylist(staffId);
    dispatch(fetchPostStaffDetailById(staffId));
    setOpen(true);
  };

  const onClose = () => {
    setSelectedStylist(null);
    dispatch(fetchPostStaff());
    setOpen(false);
  };

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
    const updatedData = {
      staffID: selectedStylist,
      fullName: values.fullName,
      avatar: avatarUrl || "avatar3.png", // Use uploaded avatar if available
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      yob: values.yob.format(dateFormat),
      deleted: values.status,
      userID: dataStaffDetail?.userID || null,
    };

    dispatch(fetchUpdateStaff(updatedData))
      .then(() => {
        message.success("Staff updated successfully!");
        onClose();
      })
      .catch((error) => {
        message.error(`Failed to update staff: ${error.message}`);
      });
  };

  const columns = [
    {
      title: "Staff Name",
      dataIndex: "staffname",
      key: "staffname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
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
        <Button
          style={{ color: "blue" }}
          onClick={() => showLargeDrawer(record.key)}
        >
          Detail
        </Button>
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
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="yob" label="Date of birth">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
