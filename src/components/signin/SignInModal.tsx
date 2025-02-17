"use client"
import { useEffect, useState } from 'react';
import MagicLinkModal from './MagicLink';
import PasswordSign from './PasswordSign';
import ResetPassword from './ResetPassword';
import { usePathname, useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/src/firebase/firebase';
import { toast } from 'react-toastify';
import { useUser } from '@/src/context';

const SignInModal = (customToken = null) => {
    const [tabItem, setTabItem] = useState<"magic_link" | "password" | "reset">("magic_link");
    const { user } = useUser()
    const router = useRouter()
    const pathName = usePathname()
    const isPricing = pathName.includes('/pricing');

    const signInWithCustomTokenAsync = async (customToken) => {
        await signInWithCustomToken(auth, customToken)
            .then(() => {
                toast.success('You are signed in!');
            })
            .catch((error) => {
                switch (error.code){
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
        if (customToken !== null) {
            console.log(customToken)
            signInWithCustomTokenAsync(customToken?.customToken);
        }
    }, [customToken]);

    return (
        <div className="modal fade" id="signInModal" tabIndex={-1} aria-labelledby="signInModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="signInModalLabel">Login / Register</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        user ? (
                            <div className="modal-body">
                                <div className="alert alert-success" role="alert">
                                    You are already logged in.
                                </div>
                                {!isPricing && <button
                                    className='button button--effect w-100 gap-2'
                                    data-bs-dismiss="modal"
                                    onClick={() => router.push('/dashboard')}
                                >
                                    Go to Dashboard
                                </button>}
                                {isPricing && (
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Continue">Continue</button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="modal-body">
                                    {isPricing && <div className='alert alert-warning' role='alert'>
                                        Please log in to see more details.
                                    </div>}
                                    {tabItem === 'magic_link' && <MagicLinkModal />}
                                    {tabItem === 'password' && <PasswordSign />}
                                    {tabItem === 'reset' && <ResetPassword />}
                                </div>
                                <div className="modal-footer justify-content-center align-items-center">
                                    <div className="btn-group" role="group" aria-label="signin button group">
                                        <button type="button" onClick={() => setTabItem("magic_link")} className={`btn btn-dark ${tabItem === "magic_link" ? "active" : ""}`}>Login Link</button>
                                        <button type="button" onClick={() => setTabItem("password")} className={`btn btn-dark ${tabItem === "password" ? "active" : ""}`}>Password</button>
                                        <button type="button" onClick={() => setTabItem("reset")} className={`btn btn-dark ${tabItem === "reset" ? "active" : ""}`}>Reset</button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
