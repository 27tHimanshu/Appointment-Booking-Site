import React from "react";
import Layout from "./../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table,message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account status

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId:record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("something went wrong ");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {" "}
          {record.firstName} {record.lastName}{" "}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions ",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => {
                handleAccountStatus(record , 'approved');
              }}
            >
              {" "}
              Approve{" "}
            </button>
          ) : (
            <button className="btn btn-danger"> Reject </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Doctors List</h1>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
