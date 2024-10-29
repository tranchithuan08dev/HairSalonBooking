import React, { useState } from "react";
import {
  BarChartOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  FormOutlined,
  PhoneOutlined,
  PlusSquareOutlined,
  ScissorOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const DashBroad = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function HandleDropDown() {
    setShowDropDown(!showDropDown);
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#1c1c1e", // Dark background for sidebar
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {/* Adjust the logo section */}
          Haimony Admin
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{
            fontSize: "18px", // Larger font size for the menu items
            fontWeight: "bold",
          }}
          items={[
            {
              key: "1",
              icon: <FileDoneOutlined />,
              label: (
                <Link to={`/dashboard`} style={{ textDecoration: "none" }}>
                  Home
                </Link>
              ),
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: (
                <Link
                  to={`/dashboard/service`}
                  style={{ textDecoration: "none" }}
                >
                  Service
                </Link>
              ),
            },
            {
              key: "3",
              icon: <ScissorOutlined />,
              label: (
                <Link
                  to={`/dashboard/stylist`}
                  style={{ textDecoration: "none" }}
                >
                  Stylist
                </Link>
              ),
            },
            {
              key: "4",
              icon: <PhoneOutlined />,
              label: (
                <Link
                  to={`/dashboard/staff`}
                  style={{ textDecoration: "none" }}
                >
                  Staff
                </Link>
              ),
            },
            {
              key: "5",
              icon: <FormOutlined />,
              label: (
                <Link to={`/dashboard/news`} style={{ textDecoration: "none" }}>
                  News
                </Link>
              ),
            },
            {
              key: "6",
              icon: <ContactsOutlined />,
              label: (
                <Link to={`/dashboard/user`} style={{ textDecoration: "none" }}>
                  User
                </Link>
              ),
            },
            {
              key: "7",
              icon: <BarChartOutlined />,
              label: <Space onClick={HandleDropDown}>Managerments</Space>,
            },
            showDropDown && {
              key: "8",
              icon: <ShoppingOutlined />,
              label: (
                <Link
                  to={`/dashboard/newService`}
                  style={{ textDecoration: "none" }}
                >
                  New Service
                </Link>
              ),
            },
            showDropDown && {
              key: "9",
              icon: <UserAddOutlined />,
              label: (
                <Link
                  to={`/dashboard/newStylist`}
                  style={{ textDecoration: "none" }}
                >
                  New Stylist
                </Link>
              ),
            },
            showDropDown && {
              key: "10",
              icon: <UserAddOutlined />,
              label: (
                <Link
                  to={`/dashboard/newStaff`}
                  style={{ textDecoration: "none" }}
                >
                  New Staff
                </Link>
              ),
            },
            showDropDown && {
              key: "12",
              icon: <PlusSquareOutlined />,
              label: (
                <Link
                  to={`/dashboard/createNews`}
                  style={{ textDecoration: "none" }}
                >
                  Create News
                </Link>
              ),
            },
            {
              key: "11",
              icon: <UserOutlined />,
              label: (
                <Link
                  to={`/dashboard/profile`}
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </Link>
              ),
            },
          ]}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0",
            background: colorBgContainer,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            height: "100px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: "bold",
              color: "#454548",
              textTransform: "uppercase",
            }}
          >
            Haimony Salon
          </h1>
        </Header>

        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBroad;
