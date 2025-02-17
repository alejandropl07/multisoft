"use client";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth } from "@/lib/firebase";

const LoginForm = ({ customToken = null }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const signInWithCustomTokenAsync = async (customToken) => {
    await signInWithCustomToken(auth, customToken)
      .then(() => {
        toast.success('You are signed in!');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-custom-token':
            toast.error('Invalid custom token.');
            break;
          case 'auth/custom-token-mismatch':
            toast.error('Custom token mismatch.');
            break;
          case 'auth/user-token-expired':
            toast.error('User token expired.');
            break;
          case 'auth/user-not-found':
            toast.error('User not found.');
            break;
          case 'auth/invalid-login-credentials':
            toast.error('Invalid login credentials.');
            break;
        }
        console.log(error)
      });
  }

  useEffect(() => {
    if (customToken) {
      signInWithCustomTokenAsync(customToken);
    }
  }, [customToken]);



  return (
    <form
      action="#"
      className="user-data-form mt-40 lg-mt-30"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta mb-30">
            <label>Email</label>
            <input type="email" placeholder="hasan@gmail.com" required />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-12">
          <div className="input-group-meta mb-25">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="pass_log_id"
              required
            />
            <span className="placeholder_icon" onClick={handleTogglePassword}>
              <span className=" d-flex align-items-center">
                {showPassword ? (
                  <>
                    <FaEye size={18} />
                  </>
                ) : (
                  <>
                    <FaEyeSlash size={18} />
                  </>
                )}
              </span>
            </span>
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a href="#">Forget Password?</a>
          </div>
          {/* /.agreement-checkbox */}
        </div>
        {/* End .col-12 */}

        <div className="col-12">
          <button className="btn-twentyTwo w-100 fw-500 tran3s text-uppercase mt-30">
            Login
          </button>
        </div>
        {/* End .col-12 */}
      </div>
    </form>
  );
};

export default LoginForm;
