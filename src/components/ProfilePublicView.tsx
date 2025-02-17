"use client";
import React, { Fragment } from "react";
//import Plyr from 'plyr-react';
import getYouTubeID from 'get-youtube-id';
import { BsTelephone, BsEnvelope, BsGlobe, BsFacebook, BsTwitterX, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";


import { UserPublicData } from "@/src/types/UserPublicData";
import config from "@/config";
import Accordion from "@/src/components/reuseable/Accordion";


export default function ProfilePublicView({ userPublicData, leadType = 'buyer_lead' }: { userPublicData: UserPublicData, leadType: "buyer_lead" | "seller_lead" }) {

    return (
        <div className="row">
            <div className="col-xl-4">
                <div className="card mb-4 shadow-xl p-3 rounded">
                    <div className="card-header text-center">
                        <h4>{userPublicData?.name}</h4>
                        <div className="font-italic text-muted mb-4">{userPublicData?.broker} - {userPublicData?.license}</div>
                    </div>
                    <div className="card-body text-center p-2">
                        <img className="img-account-profile rounded-circle mb-2 m-auto" width={250} src={userPublicData?.avatar || "/images/avatar_01.png"} alt="Agent Avatar" />
                        {/* call and email buttons */}
                        <div className="d-flex justify-content-center gap-3">
                            <a href={`tel:${userPublicData?.phone}`} className="btn btn-primary btn-lg rounded-pill" style={{ color: 'white' }}>
                                <BsTelephone className="bi bi-telephone me-1" />
                                Call
                            </a>
                            <a href={`mailto:${userPublicData?.email}`} className="btn btn-orange btn-lg rounded-pill">
                                <BsEnvelope className="bi bi-envelope me-1" />
                                Email
                            </a>
                        </div>

                        <nav className="nav social justify-content-center gap-3 mt-3">
                            {userPublicData?.website && <a href={userPublicData?.website} className="btn btn-circle btn-sm btn-primary">
                                <BsGlobe className="uil uil-globe" />
                            </a>}
                            {userPublicData?.facebook && <a href={userPublicData?.facebook} className="btn btn-circle btn-sm btn-facebook">
                                <BsFacebook className="uil uil-facebook-f" />
                            </a>}
                            {userPublicData?.twitter && <a href={userPublicData?.twitter} className="btn btn-circle btn-sm btn-twitter">
                                <BsTwitterX className="uil uil-twitter" />
                            </a>}
                            {userPublicData?.instagram && <a href={userPublicData?.instagram} className="btn btn-circle btn-sm btn-instagram">
                                <BsInstagram className="uil uil-instagram" />
                            </a>}
                            {userPublicData?.linkedin && <a href={userPublicData?.linkedin} className="btn btn-circle btn-sm btn-linkedin">
                                <BsLinkedin className="uil uil-linkedin" />
                            </a>}
                            {userPublicData?.youtube && <a href={userPublicData?.youtube} className="btn btn-circle btn-sm btn-youtube">
                                <BsYoutube className="uil uil-youtube" />
                            </a>}
                        </nav>
                        {/* bio */}
                        <div className="font-italic text-muted mb-4 mt-4">{userPublicData?.bio}</div>
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
                <div className="card mb-4 shadow-xl p-3 rounded">
                    {/* Youtube Video */}
                    {userPublicData?.youtubeVideo && <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <span className="h4 text-muted mb-3 mt-3 text-center">Video Introduction</span>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" style={{ width: '100%', height: 500 }} src={`https://www.youtube.com/embed/${getYouTubeID(userPublicData?.youtubeVideo)}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {/* Services, make cards with icon, title and text*/}
                    <div className="row">

                        <Fragment>
                            <h2 className="text-muted mb-3 mt-3 text-center">Frequently Asked Questions</h2>
                            <div className="accordion-wrapper" id="accordion">
                                {leadType === 'seller_lead' && config.publicProfile.sellerFAQs.map((item, i) => {
                                    return (
                                        <div className="col-12 mb-2" key={i}>
                                            <Accordion key={item.no} {...item} />
                                        </div>
                                    );
                                })}
                                {leadType === 'buyer_lead' && config.publicProfile.buyerFAQs.map((item, i) => {
                                    return (
                                        <div className="col-12 mb-2" key={i}>
                                            <Accordion key={item.no} {...item} />
                                        </div>
                                    );
                                })}
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </div>
    )
}