import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row ,TimePicker} from "antd";

const ApplyDoctor = () => {
  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <h1 className="text-center"> Apply Doctor</h1>
      
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
              rules={[{ required: true, message: "Specialisation is required" }]}
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
              <Input type="text" placeholder="Your experience in years"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true, message: "Fees is required" }]}
            >
              <Input type="number" placeholder="Your consultation fees"></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Work Timings"
              name="timings"
              required
              rules={[{ required: true, message: "Work timings are required" }]}
            >
            <TimePicker.RangePicker format = "HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" type="submit">
                Submit
          </button>
        </div>

      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
