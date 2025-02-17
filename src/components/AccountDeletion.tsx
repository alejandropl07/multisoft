"use client";
import { useState } from "react";
import { toast } from "react-toastify";

import { useUser } from "@/src/context";

export default function AccountDeletion() {
    const { user } = useUser();

    const [secondScreen, SetSecondScreen] = useState(false);
    const [deleteConsent, SetDeleteConsent] = useState('');

    const [errorMessage, SetErrorMessage] = useState<string>('');

    return (
        <div className="setting-card mb-2">
            <h3 className="mb-2">Delete Account</h3>
            <div className="col-12">
                <button onClick={() => SetSecondScreen(!secondScreen)} className="btn btn-danger">Delete Account</button>

                {secondScreen &&
                    <div className="card mt-4">
                        <div className="card-body">
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">Warning!</h4>
                                <p>Deleting your account will remove all your data from our servers. This action cannot be undone.</p>
                                <p>If you have an active subscription, cancel it before deleting your account or you may be charged again.</p>
                                <p className="mb-0">If you are sure you want to delete your account, please type "delete my account" below and click "Delete".</p>
                            </div>
                            {errorMessage && <div className="alert alert-danger mt-4" role="alert">
                                {errorMessage}
                            </div>}
                            <input id="deleteConsent" type="text" value={deleteConsent} className="form-control"
                                onChange={(e) => {
                                    SetDeleteConsent(e.target.value)
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (deleteConsent === 'delete my account') {
                                        user.delete().then(() => {

                                            toast.success('Account deleted. We are sorry to see you go.');
                                        }).catch((error) => {
                                            console.log(error);

                                            switch (error.code) {
                                                case 'auth/requires-recent-login':
                                                    SetErrorMessage('Cannot delete account. This operation is sensitive and requires recent authentication. Tap on "Logout" then log in again before retrying this request.');
                                                    break;
                                                default:
                                                    SetErrorMessage('Something went wrong. Please try again.');
                                                    break;
                                            }
                                        });
                                    } else {
                                        SetErrorMessage('Please type "delete my account" to confirm.');
                                    }
                                }}

                                className="btn btn-danger mt-4">Delete</button>
                        </div>
                    </div>}

            </div>
        </div>
    );
}