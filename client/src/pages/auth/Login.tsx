import LoginComponent from '../../components/auth/Login'
import logoSvg from "../../assets/images/logo.svg";
import { Link } from 'react-router-dom'
import { SIGNUP_ROUTE } from '../../utils/constants'
const Login = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <img className=" h-10 w-auto" src={logoSvg} alt="Your Company" />
      <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Log in
      </h2>
    </div>
    

    <LoginComponent />

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?{" "}
      <Link
        to={SIGNUP_ROUTE}
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Create New Account
      </Link>
    </p>
  </div>
  )
}

export default Login
