'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BsEnvelope } from 'react-icons/bs';
import { authPasswordLessSignIn } from '@/src/firebase/firebase';

export default function MagicLinkModal({
    showTitle = true,
    isStripeCheckout = false,
    stripeCheckOutPaymentData = null,
}) {
    const [emailSent, setEmailSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email') as string;

        setSending(true);
        let redirectUrl = `${window.location.protocol}//${window.location.host}/redirect?email=${email}`;
        localStorage.setItem('emailForSignIn', email);

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
            const response = await authPasswordLessSignIn({
                email: email,
                url: redirectUrl,
            }) as any;
            switch (response?.data?.status) {
                case 'success':
                    toast.success(response?.data?.message);
                    break;
                case 'error':
                    toast.error(response?.data?.message);
                    setError(response?.data?.message);
                    break;
                default:
                    toast.error(
                        'Something went wrong, please try again or contact our support team.'
                    );
                    setError(
                        'Something went wrong, please try again or contact our support team.'
                    );
                    break;
            }
        } catch (error) {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setError(
                'Something went wrong, please try again or contact our support team.'
            );
        } finally {
            setEmailSent(true);
            setSending(false);
        }
    };

    return (
        <>
            {!emailSent && (
                <form
                    className=""
                    onSubmit={(e) => sendMagicLink(e)}
                >
                    <span className=''>
                        If this is your first login, a new account will be created for you.
                    </span>
                    <div className="input input--secondary mt-3">
                        <label htmlFor="signInMail">Email*</label>
                        <input
                            type="email"
                            name="email"
                            id="signInMail"
                            placeholder="Enter your email"
                            autoComplete='email'
                            className="form-control"
                            required
                        />
                    </div>
                    <button
                        className='button button--effect w-100 gap-2'
                        disabled={sending}>
                        <BsEnvelope />{' '}
                        {!sending ? `Send SignIn Link` : `Sending...`}
                    </button>
                </form>
            )}
            {emailSent && (
                <div className='d-flex justify-content-center align-items-center flex-column text-center'>
                    {/* <span className='mb-3'>
                        Check your spam folder if you don&apos;t see the email.
                    </span> */}
                    <div
                        className={`alert alert-${!error ? 'success' : 'danger'} text-start w-100`}
                        role='alert'>
                        <h5>
                            {!error ? `We sent you a login link.` : `Something went wrong.`}
                        </h5>
                        <span className='mb-3'>
                            {!error
                                ? `Check your email to continue with the sign in process.`
                                : error}
                        </span>
                    </div>
                    <span className='align-self-start'>
                        Made a mistake?{' '}
                        <a
                            className='text-dark'
                            href='#'
                            onClick={() => {
                                setEmailSent(false);
                                setError(null);
                                setSending(false);
                            }}>
                            Click here
                        </a>{' '}
                        to update your email.
                    </span>
                </div>
            )}
        </>
    );
}
