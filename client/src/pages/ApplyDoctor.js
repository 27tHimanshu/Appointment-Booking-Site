import React from 'react'
import Layout from '../components/Layout'
import { Col ,Form ,Input,Row} from 'antd'

const ApplyDoctor = () => {
   
    const handleFinish = (values)=>{
        console.log( values );
    }


  return (
    <Layout>
        <h1 className='text-center'> Apply Doctor</h1>
        <h4 > Personal Details </h4>
        <Form layout='vertical' onFinish={handleFinish}>
           <Row>
             <Col xs={24} md='24' lg='8'>
                <Form.Item label='first name' name='firstName' required rules={[{required:true}]}>
                    <Input type='text' placeholder='your-name'></Input>
                </Form.Item>
             </Col>
           </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor


