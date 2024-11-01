import { useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
  Tag,
  Radio,
  DatePicker,
  message,
  Spin, // <-- Import message from antd
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostStaff,
  fetchPostStaffDetailById,
  fetchSalaryStaff,
  fetchUpdateSalary,
  fetchUpdateStaff,
} from "../../../store/dashbroadSlice";
import CurrencyFormat from "react-currency-format";
import Search from "antd/es/input/Search";

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
  const [isSpin, setIsSpin] = useState(false);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const dataStaff = useSelector((state) => state.DASHBOARD.postStaff);
  const dataStaffDetail = useSelector(
    (state) => state.DASHBOARD.postStaffDetailById
  );
  console.log("detai", dataStaffDetail);

  const dataSalaryStaff = useSelector((state) => state.DASHBOARD.salaryStaff);
  console.log("dataSalaryStaff", dataSalaryStaff);
  console.log("id", dataStaffDetail.userID);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostStaff());
  }, [dispatch]);

  useEffect(() => {
    if (dataSalaryStaff) {
      form.setFieldsValue({
        basesalary: dataSalaryStaff.baseSalary,
        totalsalary: dataSalaryStaff.totalSalary,
      });
    }
    if (dataStaffDetail) {
      form.setFieldsValue({
        fullName: dataStaffDetail.fullName,
        gender: dataStaffDetail.gender,
        yob: dayjs(dataStaffDetail.dob),
        phoneNumber: dataStaffDetail.phoneNumber,
        email: dataStaffDetail.email,
        address: dataStaffDetail.address,
        status: dataStaffDetail.StaffDeleted,
      });
      setAvatarUrl(dataStaffDetail.avatar || "");
      setUserId(dataStaffDetail.userID);
    }
  }, [dataStaffDetail, form, dataSalaryStaff]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSalaryStaff(userId));
    }
  }, [userId, dispatch, form, dataStaffDetail]);
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
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      console.log("img", imageUrl);

      setAvatarUrl(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFinish = (values) => {
    setIsSpin(true);
    const updatedSalary = {
      salaryID: dataSalaryStaff.salaryID,
      baseSalary: values.basesalary.toString().replace(/,/g, ""),
    };
    console.log("updatedSalary", updatedSalary);

    const updatedData = {
      staffID: selectedStylist,
      fullName: values.fullName,
      avatar: selectedFile,
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      dob: values.yob.format(dateFormat),
      deleted: values.status,
      userID: dataStaffDetail?.userID || null,
    };

    dispatch(fetchUpdateStaff(updatedData));
    dispatch(fetchUpdateSalary(updatedSalary))
      .then(() => {
        message.success("Staff updated successfully!");
        setIsSpin(false);
        onClose();
      })
      .catch((error) => {
        message.error(`Failed to update staff: ${error.message}`);
        setIsSpin(false);
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

  const hanldeSearch = (value) => {
    const filteredData = dataStaff.filter((item) => item.phone.includes(value));
    setFilteredData(filteredData.length ? filteredData : dataStaff);
  };

  const data = (filteredData || dataStaff).map((index, i) => ({
    key: index.id || `staff-${i}`,
    staffname: index.fullName,
    status: index.deleted ? "Inactive" : "Active",
    phone: index.phone,
    hiredate: dayjs(index.hireDate).format("YYYY-MM-DD"),
  }));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Space>
          <Search
            placeholder="Search by phone"
            onSearch={hanldeSearch}
            style={{
              width: 200,
            }}
          />
        </Space>
      </div>
      <Table columns={columns} dataSource={data} />

      <Drawer
        title="Detail Staff"
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
          <Form.Item
            name="fullName"
            label="Staff Name"
            rules={[{ required: true, message: "Please enter the staff name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender" }]}
          >
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="basesalary"
            label="Base Salary"
            rules={[
              { required: true, message: "Please enter the base salary" },
            ]}
          >
            <CurrencyFormat
              customInput={Input}
              thousandSeparator={true}
              decimalScale={0}
              fixedDecimalScale={false}
              allowNegative={false}
            />
          </Form.Item>
          <Form.Item name="totalsalary" label="Salary">
            <Input addonAfter="USD" disabled />
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
              { required: true, message: "Please enter your email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="yob"
            label="Date of birth"
            rules={[
              { required: true, message: "Please select your date of birth!" },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Please enter your address!" },
              {
                min: 10,
                message: "Address must be at least 10 characters long!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select your status!" }]}
          >
            <Radio.Group>
              <Radio value={true}>Inactive</Radio>
              <Radio value={false}>Active</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              {isSpin && (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                  size="small"
                />
              )}
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Staff;
