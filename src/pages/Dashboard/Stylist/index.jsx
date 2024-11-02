import { useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
  InputNumber,
  Tag,
  Radio,
  DatePicker,
  message,
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostStylist,
  fetchPostStylistDetailById,
  fetchSalary,
  fetchUpdateSalary,
  fetchUpdateStylist,
} from "../../../store/dashbroadSlice";
import CurrencyFormat from "react-currency-format";
import Search from "antd/es/input/Search";

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

const Stylist = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSpin, setIsSpin] = useState(false);
  const fileInputRef = useRef(null);
  const [filteredData, setFilteredData] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(fetchPostStylist());
  }, [dispatch]);

  const dataStylist = useSelector((state) => state.DASHBOARD.postStylist);
  const dataStylistById = useSelector(
    (state) => state.DASHBOARD.postStylistDetailById
  );
  const dataSalaryStylist = useSelector((state) => state.DASHBOARD.salary);
  console.log("dataSalaryStylist", dataSalaryStylist);

  if (dataStylist == null) {
    return <></>;
  }

  useEffect(() => {
    if (dataSalaryStylist) {
      form.setFieldsValue({
        basesalary: dataSalaryStylist.baseSalary,
        totalsalary: dataSalaryStylist.totalSalary,
      });
    }
    if (dataStylistById) {
      form.setFieldsValue({
        fullName: dataStylistById.fullName,
        gender: dataStylistById.gender,
        yob: dayjs(dataStylistById.dob),
        phoneNumber: dataStylistById.phoneNumber,
        email: dataStylistById.email,
        address: dataStylistById.address,
        level: dataStylistById.level,
        status: dataStylistById.StylistDeleted,
      });
      setAvatarUrl(dataStylistById.avatar || "");
      setUserId(dataStylistById.userID);
    }
  }, [dataStylistById, form, dataSalaryStylist]);
  console.log(dataStylistById);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSalary(userId));
    }
  }, [userId, dispatch, form, dataStylistById]);

  const showLargeDrawer = (stylist) => {
    setSelectedStylist(stylist);
    dispatch(fetchPostStylistDetailById(stylist));
    setOpen(true);
  };

  const onClose = () => {
    setSelectedStylist(null);
    dispatch(fetchPostStylist());
    setOpen(false);
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

  const onFinish = (values) => {
    setIsSpin(true);
    const updatedSalary = {
      salaryID: dataSalaryStylist.salaryID,
      baseSalary: values.basesalary.toString().replace(/,/g, ""),
    };

    const updatedData = {
      stylistID: selectedStylist,
      fullName: values.fullName,
      avatar: selectedFile,
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      dob: values.yob.format(dateFormat),
      level: values.level,
      deleted: values.status,
      userID: dataStylistById?.userID || null,
    };
    console.log("updatedData", updatedData);

    dispatch(fetchUpdateStylist(updatedData));
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
      title: "Stylist Name",
      dataIndex: "stylistname",
      key: "stylistname",
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

  const hanldeSearch = (value) => {
    const filteredData = dataStylist.filter((item) =>
      item.phone.includes(value)
    );
    setFilteredData(filteredData.length ? filteredData : dataStaff);
  };

  const data = (filteredData || dataStylist).map((index) => ({
    key: index.id,
    stylistname: index.fullName,
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
            label="Stylist Name"
            rules={[
              { required: true, message: "Please enter the stylist name" },
            ]}
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
              suffix="VND"
            />
          </Form.Item>
          <Form.Item name="totalsalary" label="Salary">
            <Input addonAfter="VND" disabled />
          </Form.Item>
          <Form.Item
            name="yob"
            label="Date of birth"
            rules={[
              { required: true, message: "Please select the date of birth" },
              {
                type: "object",
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please select a valid date")),
              },
            ]}
          >
            <DatePicker format={dateFormat} />
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
                required: true,
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

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="level"
            label="Level"
            rules={[
              { required: true, message: "Please enter the level" },
              {
                type: "number",
                min: 1,
                max: 5,
                message: "Level must be between 1 and 5",
              },
            ]}
          >
            <InputNumber min={1} max={5} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Radio.Group>
              <Radio value={true}>Inactive</Radio>
              <Radio value={false}>Active</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
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

export default Stylist;
