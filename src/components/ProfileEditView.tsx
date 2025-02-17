"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import config from "@/config";
import { useUser } from "@/src/context";
import ProfilePublicView from "@/src/components/ProfilePublicView";

export default function ProfileEditView() {
    const { userPublicData, fetchUserPublicDataAsync, uploadAvatarAsync, saveUserPublicDataAsync } = useUser()

    const [initializing, setInitializing] = useState(true);
    const [viewAsPublic, setViewAsPublic] = useState<boolean>(false);
    const [leadType, setLeadType] = useState<"buyer_lead" | "seller_lead">("buyer_lead");
    const [uploadingData, setUploadingData] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const [tabItem, setTabItem] = useState("general");

    useEffect(() => {
        fetchUserPublicDataAsync()
            .catch(() => {
                toast.error("Error fetching user data");
            }).finally(() => {
                setInitializing(false);
            });
    }, []);

    const uploadAvatar = async (event: React.FormEvent<HTMLFormElement>) => {
        setUploadingAvatar(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const uri = data.avatar as File
        console.log(data)
        try {
            await uploadAvatarAsync(uri)
            toast.success("Avatar uploaded successfully");
        } catch (error) {
            toast.error(`Error uploading avatar: ${error.message}`);
            throw new Error(error)
        } finally {
            setUploadingAvatar(false);
        }
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUploadingData(true)
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await saveUserPublicDataAsync(data)
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(`Error updating profile: ${error.message}`);
            throw new Error(error)
        } finally {
            setUploadingData(false);
        }

    }

    //make a loading screen with a spinner
    if (initializing) return (
        <div style={{ minHeight: "50vh" }} className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary1" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className="row justify-content-center">
            <div className="col-12 justify-content-center d-flex mb-5 align-items-center gap-2 d-none">
                <span className="h4 m-0">View:</span>
                <button className={`btn ${!viewAsPublic ? 'btn-primary' : 'btn-outline-primary'} rounded-pill btn-sm`}
                    onClick={() => setViewAsPublic(false)}>
                    Edit
                </button>
                <button className={`btn ${viewAsPublic ? 'btn-primary' : 'btn-outline-primary'} rounded-pill btn-sm`}
                    onClick={() => setViewAsPublic(true)}>
                    Public
                </button>
                {(viewAsPublic) && (
                    <button className={`btn ${leadType === 'buyer_lead' ? 'btn-info' : 'btn-outline-info'} rounded-pill btn-sm`}
                        onClick={() => {
                            if (leadType === 'buyer_lead') {
                                setLeadType('seller_lead')
                            } else {
                                setLeadType('buyer_lead')
                            }
                        }
                        }>
                        {leadType === 'buyer_lead' ? 'Buyer' : 'Seller'}
                    </button>
                )}
            </div>
            {!viewAsPublic && (
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 shadow-xl p-3 rounded">
                            <div className="card-header text-center">Profile Picture</div>
                            <div className="card-body text-center p-2">
                                <img className="img-account-profile rounded-circle mb-2 m-auto" width={250} src={userPublicData?.avatar || "/images/21-avatar.gif"} alt="Agent Avatar" />
                                <div className="small font-italic text-muted mb-4">Upload an image to display to your leads.</div>
                                <form onSubmit={uploadAvatar}>
                                    <div className="form-floating mb-3">
                                        <input required type="file" className="form-control" id="avatar" placeholder="Avatar" name="avatar" accept="image/*" />
                                    </div>
                                    <button className="btn btn-primary" type="submit">
                                        {uploadingAvatar ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Upload"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4 shadow-xl p-3 rounded">
                            <div className="card-header">Public Details</div>
                            <div className="card-body p-2">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row">
                                        {config.publicProfile.inputs.map((input, index) => {
                                            return (
                                                <div key={index} className="col-sm-6">
                                                    <div className="form-floating mb-2" key={index}>
                                                        <input id={input.id} type={input.type} className="form-control" placeholder={input.placeholder} name={input.name} defaultValue={userPublicData?.[input.name]} />
                                                        <label htmlFor={input.id}>{input.label}</label>
                                                    </div>
                                                </div>
                                            )

                                        })}
                                        {config.publicProfile.textareas.map((textarea, index) => {
                                            return (
                                                <div key={index} className="col-sm-12">
                                                    <div className="form-floating mb-2" key={index}>
                                                        <textarea id={textarea.id} style={{ height: 150 }} className="form-control" placeholder={textarea.placeholder} name={textarea.name} defaultValue={userPublicData?.[textarea.name]} />
                                                        <label htmlFor={textarea.id}>{textarea.label}</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button className="btn btn-primary" type="submit">
                                        {uploadingData ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Save Changes"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {viewAsPublic && (
                <ProfilePublicView userPublicData={userPublicData ?? {}} leadType={leadType} />
            )}
        </div>
    )

}