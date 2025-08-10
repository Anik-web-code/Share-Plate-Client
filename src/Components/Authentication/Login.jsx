import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:transition-colors">
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-black">
          Login Now!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-black">
          Login and explore jobs in order to find your dream job
        </p>
      </div>

      <div className="card w-full max-w-sm shadow-2xl bg-white dark:bg-gray-800 transition-colors">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />

            <label className="label text-gray-700 dark:text-gray-200 mt-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />

            <button className="btn btn-neutral mt-5 w-full">Login</button>
          </form>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            New to this site?{" "}
            <Link className="text-blue-500 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full mb-4"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <path fill="#fff" d="M0 0H512V512H0" />
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
