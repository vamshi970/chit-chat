import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "../../utils/constants";
import AuthLoader from "../ui/loaders/AuthLoader";
import { isObjectEmpty } from "../../utils/helper";
import { useLoginMutation } from "../../hooks/auth";

const Login = () => {
  
  const {
    handleSubmit,
    onSubmit,
    register,
    isError,
    errors,
    error,
    isPending,
    isSubmitting,
  } = useLoginMutation();

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="email"
              placeholder="name@yahoo.com"
              {...register("email")}
              autoComplete="email"
              className={`block w-full rounded-md border-0 py-2
               ${isError ? "ring-red-500" : "ring-gray-300"}
               text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2`}
            />
          </div>
          {errors.email && (
            <p className="my-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="text-sm">
              <Link
                to={FORGOT_PASSWORD_ROUTE}
                className="font-semibold text-[#1964FF] hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password"
              placeholder="test123"
              {...register("password")}
              type="password"
              className={`block w-full 
              ${isError ? "ring-red-500" : "ring-gray-300"}
              rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2`}
            />
          </div>
          {errors.password && (
            <p className="my-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          {isError && isObjectEmpty(errors) && (
            <p className="text-sm text-red-500">
              {(error?.response?.data as Error)?.message ||
                "Something went wrong"}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
          >
            {isPending ? <AuthLoader /> : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
