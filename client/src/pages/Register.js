import React from 'react';
import { Form ,Input, message} from 'antd';
import {Link, useNavigate ,} from 'react-router-dom'
import axios from 'axios';
import '../styles/RegisterStyles.css';
import { useDispatch } from 'react-redux';
import { showLoading , hideLoading } from '../redux/features/alertSlice';

const Register = () => {
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnFinish = async (values)=>{
       try{
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/register' , values);
          dispatch(hideLoading());
          if(res.data.success){
                message.success('Registerd succesfully ! ');
                navigate('/login')
          }
          else{
               message.error(res.data.message);
          }

       }
       catch(error){
          dispatch(hideLoading());
          console.log(error);
          message.error('something went wrong ');
       }
    }


  return (
   <>
      <div className='form-container'>
            
          <Form className='register-form'  layout='vertical' onFinish={handleOnFinish}>
                  <h3 className='text-center'> Register Form </h3>
               <Form.Item label="Name" name="name">
                    <Input type="text" required />
               </Form.Item>
               <Form.Item label="Email" name="email">
                    <Input type="email" required />
               </Form.Item>
               <Form.Item label="passwrod" name="password">
                    <Input type="password" required />
               </Form.Item>
               <Link to="/login" className='m-3' > Already User Login here </Link>
               <button className='btn btn-primary' type="submit"> 
                Register
               </button>
          </Form>

      </div> 
   </>
  )
}

export default Register
