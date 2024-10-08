import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Col, Form, Input, Row ,TimePicker,message} from "antd";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {showLoading,hideLoading} from './../../redux/features/alertSlice'
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
 const navigate = useNavigate();

 //  update doc 

 const handleFinish = async(values) => {
  console.log(values);
  try{
    dispatch(showLoading())
    const res =await axios.post('/api/v1/doctor/updateProfile' ,{...values ,userId:user._id,
      
        timings: [
          moment(values.timings[0]).format('HH:mm'),
          moment(values.timings[1]).format("HH:mm"),
        ],
      
    },{
       headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
       }
    })
    dispatch(hideLoading());
    if(res.data.success){
      message.success(res.data.message);
      navigate('/')
    }
    else{
      message.error(res.data.message);
    }

  }
  catch(error){
    console.log(error)
    message.error('something went wrong ');
  }
};



  // getdoc details

  const getDocInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1> Manage Profiles </h1>
      {doctor && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{
          ...doctor,
          timings:[
            moment(doctor.timings[0],'HH:mm'),
            moment(doctor.timings[1],'HH:mm'),
          ],
        }}>
          <h4> Personal Details </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your first name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your last name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your phone number"></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your email"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your website"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your address"></Input>
              </Form.Item>
            </Col>
          </Row>

          <h4> Professional Details </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialisation"
                name="specialisation"
                required
                rules={[
                  { required: true, message: "Specialisation is required" },
                ]}
              >
                <Input type="text" placeholder="Your specialisation"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true, message: "Experience is required" }]}
              >
                <Input
                  type="text"
                  placeholder="Your experience in years"
                ></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true, message: "Fees is required" }]}
              >
                <Input
                  type="number"
                  placeholder="Your consultation fees"
                ></Input>
              </Form.Item>
            </Col>
          </Row>

           <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Work Timings"
                name="timings"
                required
                rules={[
                  { required: true, message: "Work timings are required" },
                ]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row> 

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" type="submit">
               Update 
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
