import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useState } from "react";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {

  const [doctor , setDoctor ]=useState([]);
  // login user data
  const getUserData = async () => {

    try {
      const res = await axios.get(
        "/api/v1/user/getAllDocs",
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
         setDoctor(res.data.data);
      }

    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
     <h1 className="text-center "> Home Page </h1>
     <Row>
    { doctor && doctor.map(doctor=>(
      <DoctorList doctor={doctor} />
    ))}
     </Row>
    </Layout>
  );
};

export default HomePage;
