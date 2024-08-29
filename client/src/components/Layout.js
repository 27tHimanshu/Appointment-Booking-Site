import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message, Badge } from "antd";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully ");
    navigate("/login");
  };

  // Menu render based on user role
  const SidebarMenu = user?.isAdmin
    ? adminMenu(user?._id)
    : user?.isDoctor
    ? userMenu(user?._id)
    : userMenu(user?._id);

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6> DOC APP </h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={menu.name} className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}> {menu.name} </Link>
                  </div>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login"> Logout </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user?.notification?.length || 0}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to={`/doctor/profile/${user?._id}`}> {user?.name}</Link>
              </div>
            </div>
            <div className="body"> {children} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
