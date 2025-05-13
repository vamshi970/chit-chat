import ResetPasswordComponent from "../../components/auth/ResetPassword";
import logoSvg from "../../assets/images/logo.svg";
const ResetPassword = () => {
  // const { token } = useParams();
  // const [isValidToken, setIsValidToken] = useState(true);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className=" h-10 w-auto" src={logoSvg} alt="Your Company" />
        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <ResetPasswordComponent />
    </div>
  );
};

export default ResetPassword;
