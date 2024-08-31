import React, { useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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

  // ======= booking handle

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/book-appointment", {
        doctorId: params.doctorId.date,
        time,
      },
    {
      headers:{
        Authorization:` Bearer ${localStorage.getItem('token')}`
      }
    });
     
    dispatch(hideLoading());
    if(res.data.success){
        setIsAvailable(true);
        message.success(res.data.message);
    }
    else{
      message.error(res.data.message);
    }

    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1> Booking page </h1>
      <div className="container">
        <h3>
          {doctor && (
            <div>
              <h4>
                Dr. {doctor.firstName} {doctor.lastName}
              </h4>
              <h4>Fees : {doctor.feesPerConsultation}</h4>
              <h4>
                Timings : {doctor.timings[0]} {doctor.timings[1]}
              </h4>
              <div className="d-flex-column w-50">
                <DatePicker
                  className="m-2"
                  format={"DD-MM-YYYY"}
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDate(moment(value).format("DD-MM-YY"));
                  }}
                />
                <TimePicker
                  className="m-2"
                  format={"HH:mm"}
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                />

                <button className="btn btn-primary m-2" onClick={()=>{handleAvailability()}}>
                  {" "}
                  Check Availability{" "}
                </button>

                {isAvailable && (
                  <button
                  className="btn btn-dark m-2"
                  onClick={() => {
                    handleBooking();
                  }}
                >
                  {" "}
                  Book Now{" "}
                </button>
                )}
              </div>
            </div>
          )}
        </h3>
      </div>
    </Layout>
  );
};

export default BookingPage;
