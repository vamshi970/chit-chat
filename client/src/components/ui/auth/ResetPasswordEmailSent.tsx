import React from 'react';
import { Result } from 'antd';

const ResetPasswordEmailSent: React.FC = () => (
  <div className='h-screen w-screen flex justify-center items-center' > 
    <Result
    status="success"
    title="Successfully Sent Reset Link to Email!"
    subTitle="Please check your email for the reset link.If you don't see the email, please check your spam folder."
    extra={[
    //   <Button type="primary" key="console">
    //     Go Console
    //   </Button>,
    //   <Button key="buy">Buy Again</Button>,
    ]}
  />
  </div>
);

export default ResetPasswordEmailSent;