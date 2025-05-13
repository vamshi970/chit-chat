import AuthLoader from "../ui/loaders/AuthLoader";
import { isObjectEmpty } from "../../utils/helper";
import { useVerifyOtpMutation } from "../../hooks/auth";

const Otp = () => {
  const {
    errors,
    handleSubmit,
    isError,
    isPending,
    isSubmitting,
    onSubmit,
    register,
  } = useVerifyOtpMutation();

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
            Otp<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="otp"
              placeholder="1234"
              maxLength={4}
              {...register("otp")}
              className={`block w-full rounded-md border-0 py-2
               ${isError ? "ring-red-500" : "ring-gray-300"}
               text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1964FF] sm:text-sm sm:leading-6 px-2`}
            />
          </div>
          {errors.otp && (
            <p className="my-2 text-sm text-red-500">{errors.otp.message}</p>
          )}
        </div>

        <div>
          {isError && isObjectEmpty(errors) && (
            <p className="text-sm text-red-500">
              Invalid OTP. Please try again
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="flex w-full justify-center rounded-md bg-[#1964FF] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
          >
            {isPending ? <AuthLoader /> : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
