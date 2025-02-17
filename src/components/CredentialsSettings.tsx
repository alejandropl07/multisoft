"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { useUser } from "@/src/context";

export default function CredentialsSettings() {
  const { user } = useUser()

  const [newEmail, SetNewEmail] = useState('');
  const [changeEmail, SetChangeEmail] = useState(false);

  const handleChangeEmail = async (newEmail: string) => {
    if (!user) {
      toast.warning('Please login to change your email address.');
      return
    }
    if (await checkEmailbeforeChange(newEmail)) {
      updateProfile(user, { displayName: newEmail })
    }
  }

  const checkEmailbeforeChange = async (newEmail: string) => {
    if (!user) {
      toast.warning('Please login to change your email address.');
      return false;
    }
    try {
      await verifyBeforeUpdateEmail(user, newEmail);
      toast.success('Please check your inbox. We sent an email with a verification link. You may need to login again after verifying your email address to see the changes.');
      return true;
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        toast.warning('Cannot change email. This operation is sensitive and requires recent authentication. Tap on "Logout" then log in again before retrying this request.');
      }
      return false;
    }
  };


  return (
    <div className="setting-card mb-2">
      <h3 className="mb-2">Update Account Email</h3>
      <div className="col-12">
        <p className="card-text">{user?.email}</p>
        <button onClick={() => {
          SetChangeEmail(!changeEmail)
        }} className="btn btn-danger">Change</button>

        {changeEmail &&
          <div className="card mt-4">
            <div className="card-body">
              <label htmlFor="#new-email" className="fs-18 fw-bolder me-10">New Email:</label>
              <input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => {
                  SetNewEmail(e.target.value)
                }}
                className="form-control"
              />
              <button
                onClick={() => {
                  handleChangeEmail(newEmail)
                }}
                className="btn btn-warning mt-4">Update</button>
            </div>
          </div>}


      </div>
    </div>
  );
}