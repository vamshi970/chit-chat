import OtpComponent from '../../components/auth/Otp'

import logoSvg from "../../assets/images/logo.svg";
const Otp = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <img className=" h-10 w-auto" src={logoSvg} alt="Your Company" />
      <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Verify your account
      </h2>
      <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
        Enter the 4 digit OTP sent to your email address
      </p>
    </div>
    

    <OtpComponent />
  </div>
  )
}

export default Otp
