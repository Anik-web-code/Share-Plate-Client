import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Register = () => {
  const { createUser, googleSignIn } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasLowercase) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }

    if (!isLongEnough) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="mx-auto w-[80%]">
        <h1 className="text-5xl font-bold text-center mb-5">Register Now</h1>
      </div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
              placeholder="Name"
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
              placeholder="Email"
              required
                      />
                      
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
              placeholder="Password"
              required
            />
            <label className="label">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white"
              placeholder="Link to your photo"
              required
            />
            <button className="btn btn-neutral mt-4">Register</button>
          </form>
          <p>
            Already Have an Account?{" "}
            <Link className="text-blue-400 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
        <button
          className="btn bg-white text-black border-[#e5e5e5]"
          onClick={() => {
            googleSignIn()
              .then((result) => {
                console.log("Google sign-in successful:", result.user);
                navigate("/");
              })
              .catch((error) => {
                console.error("Google sign-in error:", error);
                alert("Google sign-in failed.");
              });
          }}
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

export default Register;
