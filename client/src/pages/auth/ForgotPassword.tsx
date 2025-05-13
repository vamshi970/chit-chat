import logoSvg from "../../assets/images/logo.svg";
import ForgotPasswordComponent from '../../components/auth/ForgotPassword'


const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className=" h-10 w-auto" src={logoSvg} alt="Your Company" />
      <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Forgot Password ?
      </h2>
    </div>

    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <p className=" text-sm mt-2 text-gray-400">
       A link will be sent to this email
      </p>
    </div>

    <ForgotPasswordComponent />
  </div>
  )
}

export default ForgotPassword
