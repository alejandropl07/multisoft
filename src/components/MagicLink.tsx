"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsEnvelopeFill } from "react-icons/bs";

import config from "@/config";
import { authPasswordLessSignIn, auth } from '@/src/firebase/firebase';

export default function MagicLinkModal({ isStripeCheckout = false, stripeCheckOutPaymentData = null, isPasswordEnabled = true }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [signInType, setSignInType] = useState<'link' | 'password' | 'reset' | 'close'>('link');

    const sendMagicLink = async () => {

        setSending(true);
        const currentUrl = window.location.href;
        let redirectUrl = '';
        localStorage.setItem('emailForSignIn', email);

        //check if the current url is localhost or not
        if (currentUrl.includes('localhost')) {
            redirectUrl = `http://localhost:3000/redirect?email=${email}`;
        } else {
            redirectUrl = `https://${config.domainName}/redirect?email=${email}`;
        }

        //check if there's a redirect url in the local storage
        if (localStorage.getItem('redirectUrl')) {
            redirectUrl = localStorage.getItem('redirectUrl');
            localStorage.removeItem('redirectUrl');
        }

        //check if the user is signing up for a stripe checkout
        if (isStripeCheckout && stripeCheckOutPaymentData) {
            redirectUrl = `${redirectUrl}&stripeCheckout=true&stripeCheckoutPaymentData=${encodeURI(JSON.stringify(stripeCheckOutPaymentData))}`;
        }

        const payload = {
            email: email,
            url: redirectUrl,
        };

        console.log(payload);

        await authPasswordLessSignIn({
            email: email,
            url: redirectUrl,
        })
            .then((response: any) => {

                switch (response?.data?.status) {
                    case 'success':
                        toast.success(response?.data?.message);
                        break;
                    case 'error':
                        toast.error(response?.data?.message);
                        setError(response?.data?.message);
                        break;
                    default:
                        toast.error('Something went wrong, please try again or contact our support team.');
                        setError('Something went wrong, please try again or contact our support team.');
                        break;
                }

                setEmailSent(true);
                setSending(false);
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
                setSending(false);
                setError('Something went wrong, please try again or contact our support team.');
            });
    }

    const signInWithPassword = async (email, password) => {
        console.log(email, password);
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('You are signed in!');
                setSignInType('close');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        toast.error('Please check your email format.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('The password you entered did not match your previous password.');
                        setPassword('');
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Please do not try to guess your password, use the "Forgot password" section instead.');
                        setEmail('');
                        setPassword('');
                        break;
                    case 'auth/user-not-found':
                        toast.error('User not found.');
                        break;
                    case 'auth/invalid-login-credentials':
                        try {
                            registerWithEmailPassword(email, password)
                        } catch (error) {
                            toast.error('Invalid login credentials.');
                            console.log(error)
                        }
                        break;
                    case 'auth/invalid-credential':
                        try {
                            registerWithEmailPassword(email, password)
                        } catch (error) {
                            toast.error('Invalid login credentials.');
                            console.log(error)
                        }
                        break;
                    default:
                        toast.error('Something went wrong, please try again or contact our support team.');
                        break;
                }
                console.log(error.code)
            });
    }

    const registerWithEmailPassword = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('You are registered and signed in!');
                setSignInType('close');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('Email already in use.');
                        setSignInType('reset');
                        break;
                    case 'auth/invalid-email':
                        toast.error('Please check your email format.');
                        break;
                    case 'auth/weak-password':
                        toast.error('Weak password.');
                        break;
                }
                console.log(error)
            });
    }

    const resetEmailPassword = async (email) => {
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Please check your email inbox for a password reset link.');
                setSignInType('password');
            })
            .catch((error) => {
                if (error.code == 'auth/user-not-found') {
                    toast.error('We couldn\'t found an user with that email. If you keep having trouble, please contact our support team.');
                }
                console.log(error.code);
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column mt-3">
            {(!emailSent && signInType === 'link') && <div className="d-flex justify-content-center align-items-center flex-column">
                <span className="mb-3 text-center">An account will be created for you if you don't have one.</span>
                <h5 className="mb-3">Enter your email</h5>
                <input type="email" className="form-control text-center" placeholder="" autoComplete="email" name="email" id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" className="btn cs_btn cs_style_1 cs_fs_16 cs_rounded_5 cs_pl_30 cs_pr_30 cs_pt_10 cs_pb_10 overflow-hidden btn-lg m-3 w-100" id="sign-in-button"
                    onClick={sendMagicLink}
                    disabled={sending}
                >
                    <BsEnvelopeFill className="bi bi-envelope-fill me-1" /> {(!sending) ? `Send Login Link` : `Sending...`}
                </button>
                <span className="">In rare cases, the email might end up in your spam folder.</span>
            </div>}
            {(emailSent && signInType === 'link') && <div className="d-flex justify-content-center align-items-center flex-column text-center gap-3">
                <div className={`alert alert-${(!error) ? 'primary' : 'danger'}`} role="alert">
                    <h5 className="mb-3">{(!error) ? `We sent you a sign in link.` : `Something went wrong.`}</h5>
                    <span className="mb-3">{(!error) ? `Check your email to continue with the sign in process.` : error}</span>
                </div>
                <span className="mb-3">Made a mistake? <a href="#" onClick={() => {
                    setEmailSent(false)
                    setEmail('')
                    setError(null)
                    setSending(false)
                }}>Click here</a> to update your email.</span>
            </div>}
            {(signInType === 'password') && <div className="d-flex justify-content-center align-items-center flex-column">
                <span className="mb-3 text-center">If this is your first time here, a new account will be created for you.</span>
                <h5 className="mb-3">Enter your email</h5>
                <input type="email" className="form-control text-center mb-2" placeholder="" autoComplete="email" name="email" id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h5 className="mb-3">Enter your password</h5>
                <div className="input-group flex-nowrap">
                    <input type={(isPasswordVisible) ? 'text' : 'password'} className="form-control text-center" placeholder="" autoComplete="current-password" name="password" id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary p-2" type="button" id="password-visibility-toggle"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >{(!isPasswordVisible) ?
                        <FaEye size={18} />
                        :
                        <FaEyeSlash size={18} />
                        }</button>
                </div>

                <button type="button" className="btn cs_btn cs_style_1 cs_fs_16 cs_rounded_5 cs_pl_30 cs_pr_30 cs_pt_10 cs_pb_10 overflow-hidden btn-lg m-3 w-100" id="sign-in-button"
                    onClick={() => signInWithPassword(email, password)}
                    disabled={sending}
                >
                    <BsEnvelopeFill className="bi bi-envelope-fill me-1" /> {(!sending) ? `Sign In` : `Signing In...`}
                </button>
                <small className="">Forgot your password? <a href="#" className="underline" onClick={() => setSignInType('reset')}>Click here</a> to reset it.</small>
            </div>}
            {(signInType === 'reset') &&
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <span className="mb-3 text-center">We will send you a password reset link.</span>
                    <h5 className="mb-3">Enter your email</h5>
                    <input type="email" className="form-control text-center" placeholder="" autoComplete="email" name="email" id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="button" className="btn cs_btn cs_style_1 cs_fs_16 cs_rounded_5 cs_pl_30 cs_pr_30 cs_pt_10 cs_pb_10 overflow-hidden btn-lg m-3 w-100" id="sign-in-button"
                        onClick={() => resetEmailPassword(email)}
                        disabled={sending}
                    >
                        <BsEnvelopeFill className="bi bi-envelope-fill me-1" /> {(!sending) ? `Reset Password` : `Sending...`}
                    </button>
                    <span className="">In rare cases, the email might end up in your spam folder.</span>
                </div>
            }
            {(signInType === 'close') && <div className="d-flex justify-content-center align-items-center flex-column">
                <div className={`alert alert-success`} role="alert">
                    <h5 className="mb-3">You are signed in!</h5>
                    <span className="mb-3">You can close this window now.</span>
                </div>
            </div>}

            {(isPasswordEnabled && signInType !== 'close') && <div className="btn-group mt-3" role="group" aria-label="Login Options">
                <button type="button" className={`btn btn-${signInType === 'link' ? 'warning' : 'secondary'} btn-sm p-2`}
                    onClick={() => setSignInType('link')}
                >Login Link</button>
                <button type="button" className={`btn btn-${signInType === 'password' ? 'warning' : 'secondary'} btn-sm p-2`}
                    onClick={() => setSignInType('password')}
                >Password</button>
                <button type="button" className={`btn btn-${signInType === 'reset' ? 'warning' : 'secondary'} btn-sm p-2`}
                    onClick={() => setSignInType('reset')}
                >Reset</button>
            </div>}
        </div>
    )
}