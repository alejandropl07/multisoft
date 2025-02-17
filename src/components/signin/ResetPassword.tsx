"use client"
import { useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import { sendPasswordResetEmailAsync } from "@/src/firebase/firebase";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        const form = new FormData(e.currentTarget);
        const email = form.get("login__email") as string;

        try {
            await sendPasswordResetEmailAsync(email);
            toast.success("Email sent successfully");
        } catch (error) {
            console.error(error);
            let errorText = "An error occurred while signing in. Please try again.";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorText = "Invalid email address.";
                    toast.error(errorText);
                    setError(errorText);
                    break;
                default:
                    toast.error(errorText);
                    setError(errorText);
                    break;
            }
        } finally {
            setSending(false);
            setEmailSent(true)
        }
    }

    return (
        <>
            {!emailSent && <form
                className=""
                onSubmit={(e) => handleResetPassword(e)}
            >
                <div className="input input--secondary">
                    <label htmlFor="loginMail">Email*</label>
                    <input
                        type="email"
                        name="login__email"
                        id="loginMail"
                        placeholder="Enter your email"
                        required
                        className="form-control"
                    />
                </div>
                <button
                    className='button button--effect w-100 gap-2'
                    disabled={sending}>
                    <BsEnvelope />{' '}
                    {!sending ? `Send Login Link` : `Sending...`}
                </button>
            </form>}
            {
                emailSent && (
                    <div className='d-flex justify-content-center align-items-center flex-column text-center'>
                        <span className='mb-3 align-self-start'>
                            Check your spam folder if you don&apos;t see the email.
                        </span>
                        <div
                            className={`alert alert-${!error ? 'success' : 'danger'} text-start w-100`}
                            role='alert'>
                            <h5>
                                {!error ? `We sent you a Magic Link.` : `Something went wrong.`}
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
                )
            }
        </>
    );
};

export default ResetPassword;
