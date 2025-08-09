import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Login = () => {
  const { signInUser, googleSignIn } = use(AuthContext);
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
        console.log(error.user);
      });
  };

  //   const handleForgotPassword = () => {
  //     const email = document.querySelector("input[name='email']").value;
  //     if (!email) {
  //       alert("Please enter your email first.");
  //       return;
  //     }

  //     sendPasswordResetEmail(auth, email)
  //       .then(() => {
  //         alert("Password reset email sent!");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         alert("Failed to send reset email.");
  //       });
  //   };

  return (
    <div>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="text-center ">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Login and explore jobs in order to find your dream job
        </p>
      </div>
      <div className="card w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
              {/* <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-400 underline text-sm mt-2"
              >
                Forgot password?
              </button> */}
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p>
            New To This Site?{" "}
            <Link className="text-blue-400 underline" to="/register">
              Register
            </Link>
          </p>
        </div>
        <button
          onClick={googleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
