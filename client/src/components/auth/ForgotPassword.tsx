import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";

import AuthLoader from "../ui/loaders/AuthLoader";
import { useForgotPasswordMutation } from "../../hooks/auth";

const ForgotPassword = () => {
  const {
    errors,
    handleSubmit,
    isError,
    isPending,
    isSubmitting,
    onSubmit,
    register,
  } = useForgotPasswordMutation();

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
            Email<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="email"
              placeholder="name@yahoo.com"
              {...register("email")}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2"
            />
          </div>
          {errors.email && (
            <p className="my-2 text-sm text-red-500">{errors.email.message}</p>
          )}
          {isError && !errors.email && (
            <p className="text-sm my-2 text-red-500">
              Email or password is incorrect.Please try again
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
          >
            {isPending || isSubmitting ? <AuthLoader /> : "Confirm"}
          </button>{" "}
          <Link
            to={LOGIN_ROUTE}
            className="flex flex-1 justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-[#1964FF] border-[1px] border-[#1964FF]  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
          >
            {" "}
            <button type="button">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
