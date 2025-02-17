"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { auth, signInWithEmailAndPasswordAsync } from "@/src/firebase/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";

const PasswordSign = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const email = form.get("signin__email") as string;
        const password = form.get("signin__pass") as string;

        console.log(email, password)

        await signInWithPassword(email, password);

        setLoading(false);
    };

    const signInWithPassword = async (email, password) => {
        console.log(email, password);
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('You are signed in!');
            })
            .catch((error) => {
                switch (error.code){
                    case 'auth/invalid-email':
                        toast.error('Please check your email format.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('The password you entered did not match your previous password.');
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Please do not try to guess your password, use the "Forgot password" section instead.');
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
                    default:
                        try {
                            registerWithEmailPassword(email, password) 
                        } catch (error) {
                            toast.error('Invalid login credentials.');
                            console.log(error)
                        }
                        break;
                  }
                console.log(error)
            });
    }

    const registerWithEmailPassword = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('You are registered and signed in!');
            })
            .catch((error) => {
                switch (error.code){
                    case 'auth/email-already-in-use':
                        toast.error('Email already in use.');
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

    return (
        <>
            <form
                className=""
                onSubmit={(e) => handleSignIn(e)}
            >
                <div className="input input--secondary">
                    <label htmlFor="loginMail">Email*</label>
                    <input
                        type="email"
                        name="signin__email"
                        id="loginMail"
                        placeholder="Enter your email"
                        required
                        className="form-control"
                    />
                </div>
                <div className="input input--secondary">
                    <label htmlFor="loginPass">Password*</label>
                    <div className="input-group flex-nowrap">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="signin__pass"
                            id="loginPass"
                            placeholder="Password"
                            required
                            className="form-control"
                        />
                        <button className="btn btn-outline-secondary p-2 px-3" type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BsEyeSlash size={24} /> : <BsEye size={24} />}
                        </button>
                    </div>
                </div>
                <button
                    className='button button--effect w-100 gap-2'
                    disabled={loading}>
                    <BsEnvelope />{' '}
                    {!loading ? `Login` : `Loging...`}
                </button>
            </form>
        </>
    );
};

export default PasswordSign;
