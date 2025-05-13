import SignUpComponent from "../../components/auth/SignUp";
import logoSvg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";
const SignUp = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="h-10 w-auto" src={logoSvg} alt="Your Company" />
        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <SignUpComponent />

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{" "}
        <Link
          to={LOGIN_ROUTE}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
