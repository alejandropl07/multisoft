"use client";
import { ChangeEvent, useState } from "react";
import { auth, authPasswordLessSignIn } from "@/src/firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "@/src/redux/features/auth/authSlice";

export default function Login({
  showTitle = true,
  isStripeCheckout = false,
  stripeCheckOutPaymentData = null,
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const router = useRouter();
  const { showRegister } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMagicLink = async () => {
    console.log("first")
    setSending(true);
    let redirectUrl = `${window.location.protocol}//${window.location.host}/redirect?email=${email}`;
    localStorage.setItem("emailForSignIn", email);

    //check if the user is signing up for a stripe checkout
    if (isStripeCheckout && stripeCheckOutPaymentData) {
      redirectUrl = `${redirectUrl}&stripeCheckout=true&stripeCheckoutPaymentData=${encodeURI(
        JSON.stringify(stripeCheckOutPaymentData)
      )}`;
    }

    const payload = {
      email: email,
      url: redirectUrl,
    };

    console.log(payload);

    try {
      const response = (await authPasswordLessSignIn({
        email: email,
        url: redirectUrl,
      })) as any;
      switch (response?.data?.status) {
        case "success":
          toast.success(response?.data?.message);
          break;
        case "error":
          toast.error(response?.data?.message);
          setError(response?.data?.message);
          break;
        default:
          toast.error(
            "Something went wrong, please try again or contact our support team."
          );
          setError(
            "Something went wrong, please try again or contact our support team."
          );
          break;
      }
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setError(
        "Something went wrong, please try again or contact our support team."
      );
    } finally {
      setEmailSent(true);
      setSending(false);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (password !== repeatPassword && showRegister) {
      toast.error("Password not match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let user;
    try {
      if (showRegister) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = response.user;
        dispatch(loginSuccess(user));
      } else {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = response.user;
        dispatch(loginSuccess(user));
      }
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <div id="myForm" className="contactform">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="YOUR EMAIL"
                required
              />
            </div>
          </div>
          {/* End .col */}
          <div className="col-12 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="YOUR PASSWORD"
                required
              />
            </div>
          </div>
          {/* End .col */}

          {showRegister ? (
            <div className="col-12 col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  placeholder="REPEAT PASSWORD"
                  required
                />
              </div>
            </div>
          ) : null}

          <div className="col-12">
            <button type="submit" className="button" onClick={sendMagicLink}>
              <span className="button-text">
                {showRegister ? "REGISTER" : "LOGIN"}
              </span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
          {/* End .col */}
        </div>
      </div>
    </>
  );
}
