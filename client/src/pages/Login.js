import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import "../styles/RegisterStyles.css";

const Login = () => {
  const handleOnFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <Form
        className="register-form"
        layout="vertical"
        onFinish={handleOnFinish}
      >
        <h3 className="text-center"> Login Form </h3>
        
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="passwrod" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-3">
          {" "}
          Not a  User Register here{" "}
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
