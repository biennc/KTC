import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormData {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .email("Username must be a valid email"),
  password: yup
    .string()
    .required("Password is required").matches(/^(?=.*[a-zA-Z])[^\s]{8,}$/,'Password must be at least 8 characters, no spaces, at least 1 letter')
    .min(8, "Password must be at least 8 characters"),
});

const Form3 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form Data:", data);
      console.log("Remember Me:", rememberMe);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left image */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img
            src="https://slack-imgs.com/?c=1&o1=ro.gu&url=https%3A%2F%2Fnhannn87dn.github.io%2Fui-form-antd-yup%2Fstatics%2Fimg%2Fgrovia.png"
            alt="Grovia Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Reset */}
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Reset Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700">
            Not a member?{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={() => alert("Redirect to register page")}
            >
              Join Grovia Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form3;
