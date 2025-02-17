'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCreditCardFill, BsPencilSquare, BsFillCreditCardFill, BsBellFill, BsMapFill } from "react-icons/bs";

// import { useUser } from '@/lib/context';
import { displayTimestamp } from '@/src/lib/functions/formatDate';
import { CheckoutResponse } from '@/src/types/Stripe';
import { deleteUserNotification, getUserNotifications } from '@/src/firebase/firebase';

import config from '@/config';
import { useAppSelector } from '@/src/redux/hooks';

export default function DashBoard() {
    const { user } = useAppSelector(state => state.auth)
    const [pendingCheckout, setPendingCheckout] = useState<CheckoutResponse>(null);
    const [mapboxStaticImage, setMapboxStaticImage] = useState<string>(null);

    const getMapboxStaticImage = async () => {
        let lng = -70.9;
        let lat = 42.35;

        //check if lat lng is saved in local storage
        const savedLng = localStorage.getItem('lng');
        const savedLat = localStorage.getItem('lat');
        if (savedLng && savedLat) {
        lng = parseFloat(savedLng);
        lat = parseFloat(savedLat);
        }

        // if not lat lng saved in local storage, or geolocation is disabled, get user's location based on IP address
        if (!savedLng && !savedLat) {
        const response = await fetch('/api/ipstack');
        const data = await response.json();

        if (data?.longitude && data?.latitude) {
            lng = data?.longitude;
            lat = data?.latitude;
        }
        }

        //get mapbox static image
        const image = await fetch(`https://api.mapbox.com/styles/v1/${config.mapbox.userName}/${config.mapbox.styleId}/static/${lng},${lat},10/250x250?access_token=${config.mapbox.accessToken}`)

        if (image.ok) {
            setMapboxStaticImage(image.url);
        }
    }

    useEffect(() => {
        getMapboxStaticImage();
        if (localStorage.getItem('pendingCheckout')) {
            setPendingCheckout(JSON.parse(localStorage.getItem('pendingCheckout') ?? "null"));
        }
    }, [])

    const [notifications, setNotifications] = useState([]);

    const getUserNotificationsAsync = async () => {
        await getUserNotifications()
            .then((notifications) => {
                //if showAfter is set, check if it's time to show the notification
                const now = Date.now() / 1000;
                notifications = notifications.filter((notification: any) => {
                    if (notification?.showAfter) {
                        return notification?.showAfter?.seconds < now;
                    } else {
                        return true;
                    }
                });
                setNotifications(notifications);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (user) {
            getUserNotificationsAsync();
        }

    }, [])



    return (
        <div className='container'>
            <div className='row mt-2 mb-2 justify-content-center' style={{ paddingBottom: 200 }}>
                <div className='col-sm-12'>
                    <p className='mt-2 mb-3 sub-text weight-500 lineh-26'>Welcome back, here are some things you can do:</p>
                </div>
                <div className='row' >
                    {(pendingCheckout && pendingCheckout?.expires_at > Date.now() / 1000 && pendingCheckout?.client_reference_id === user.uid) && (
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="card-title"><BsCreditCardFill className="bi bi-credit-card-fill me-2" />Checkout</h5>
                                    <button type="button" className="btn-close" aria-label="Close"
                                        onClick={() => {
                                            localStorage.removeItem('pendingCheckout');
                                            setPendingCheckout(null);
                                        }}
                                    ></button>
                                </div>
                                <p className="card-text">Continue where you left off.</p>
                                <div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className="col-sm-8">
                                                    <h5 className="card-title">
                                                        {pendingCheckout?.metadata?.zipCode} - {(pendingCheckout?.amount_total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                    </h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">Lead Preference: {pendingCheckout?.metadata?.leadType}</h6>
                                                    <div className="d-flex-column">
                                                        <Link href={pendingCheckout?.url ?? "/"} className="btn btn-primary btn-sm btn-rounded m-1">
                                                            <BsCreditCardFill className="bi bi-credit-card-fill me-1" />Checkout
                                                        </Link>
                                                        <Link href={`/pricing`} className="btn btn-secondary btn-sm btn-rounded">
                                                            <BsPencilSquare className="bi bi-pencil-square me-1" />Edit
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!(pendingCheckout && pendingCheckout?.expires_at > Date.now() / 1000 && pendingCheckout?.client_reference_id === user.uid) && (
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                    <div className="col-sm-8">
                                        <h5 className="card-title"><BsFillCreditCardFill className="bi bi-credit-card-fill me-2" />Check Pricing</h5>
                                        <p className="card-text">Unleash your potential in the real estate market. Quickly generate high-quality leads and accelerate your business growth. No setup required—start driving motivated leads in just a few clicks.</p>
                                    
                                        <Link href={`/pricing`} className="btn btn-primary btn-sm btn-rounded">
                                            <BsMapFill className='me-1'/>Visit our Map
                                        </Link>
                                    </div>
                                    <div className="col-sm-4">
                                        
                                        {mapboxStaticImage && (
                                            <Link href={`/pricing`}>
                                                <img src={mapboxStaticImage} className="img-fluid mt-3 rounded mb-3" alt="Map" style={{height: 250, width: 250}} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className="card mb-2 mt-3">
                        <div className="card-body">
                            <h5 className="card-title"><BsBellFill className="bi bi-bell-fill me-2" />Account Notifications</h5>
                            {notifications.length > 0 && notifications.map((notification, index) => {
                                return (
                                    <div key={`notification-${index}`} className={`alert alert-${notification?.class || 'primary'}`} role="alert">
                                        <button type="button" className="btn-close position-absolute top-0 end-0 p-1" data-bs-dismiss="alert" aria-label="Close"
                                            onClick={() => deleteUserNotification(notification.id)}
                                        ></button>
                                        {notification.text.length > 0 && notification.text.split('_nl_').map((text, index) => {
                                            return (
                                                <p key={`text_${index}`} className="mb-0">{text}</p>
                                            )
                                        })}
                                        <br />
                                        {notification?.innerHtml && <div dangerouslySetInnerHTML={{ __html: notification?.innerHtml }}></div>}
                                        <small className="text-muted">{notification?.createdAt?.seconds && displayTimestamp(notification?.createdAt?.seconds)}</small>
                                    </div>
                                )
                            })}
                            {notifications.length === 0 && <p className="card-text">You have no new notifications.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
