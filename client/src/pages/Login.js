import React from "react";
import { Form, Input , message} from "antd";
import { Link ,useNavigate } from "react-router-dom";
import "../styles/RegisterStyles.css";
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const handleOnFinish =  async (values) => {
     try{
        const res =  await axios.post('/api/v1/user/login' , values)
        if(res.data.success) {
           message.success('Login successful ');
           navigate('/');
           localStorage.setItem("token",res.data.token);
        }
        else{
          message.error(res.data.message);
        }
     }
     catch(error){
         console.log(error);
         message.error('somoething went worng ');
     }

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
