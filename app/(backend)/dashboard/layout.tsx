'use client';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsXLg, BsCalendar, BsHouseFill, BsPersonBoundingBox, BsPersonLinesFill, BsGearWideConnected, BsShare } from "react-icons/bs";

import { logOutUser } from '@/src/firebase/firebase';
import { useUser } from '@/src/context';
import PagesLayout from "@/src/components/Layout";
import LoadingSpinner from '@/src/components/common/LoadingSpinner';
import ThemeProvider from '@/src/theme/ThemeProvider';
import { formatDate, formatTime } from '@/src/utils/time';
import '@/src/sass/default.scss';
import '@/src/sass/index.scss';

const sideBarMenuOptions = [
    {
        name: 'Overview',
        href: '/dashboard',
        icon: BsHouseFill,
    },
    {
        name: 'Leads',
        href: '/dashboard/leads',
        icon: BsPersonLinesFill,
    },
    {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: BsPersonBoundingBox,
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: BsGearWideConnected,
    },
    {
        name: 'Integrations',
        href: '/dashboard/integrations',
        icon: BsShare,
    }
];

export default function LayoutPrivate({ children }: { children: ReactNode }) {
    const { user, loading, setLoading } = useUser()
    const [countdown, setCountdown] = useState(5);
    const router = useRouter()
    const path = usePathname()
    const logOut = async () => {
        setLoading(true)
        await logOutUser();
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!user && !loading) {
            console.log("useEffect - not logged in dashboard layout")
            // const interval = setInterval(() => {
            //     setCountdown((countdown) => {
            //         if (countdown === 1) {
            //             clearInterval(interval);
            //             router.push('/');
            //         }
            //         return countdown - 1
            //     });
            // }, 1000);
            return () => {
                // clearInterval(interval);
            };
        }
    }, [user, loading]);

    useEffect(() => {
        window.scrollTo(0, 0)
        document.querySelector('.sidebar-container')?.classList.remove('show');
        document.querySelector('.sidebar-backdrop')?.classList.remove('show');
    }, [path]);

    const Toggle = () => { document.querySelector('.sidebar-container')?.classList.toggle('show'); document.querySelector('.sidebar-backdrop')?.classList.toggle('show'); }

    // if (loading)
    //     return (
    //         <LoadingSpinner full />
    //     )

    // if (!user)
    //     return (
    //         <LoadingSpinner message={`You are not logged in. Redirecting to home page in ${countdown} seconds.`} full />
    //     );

    return (
        <PagesLayout>
            <ThemeProvider>
                <main className={`main-page-wrapper mt-90 md-mt-120`}>
                    <div className='container dashboard_layout_container p-0'>
                        <div className='row mx-0'>
                            <div className='col-xl-3'>
                                <div className='sidebar mx-2 px-3 py-3 shadow-lg mb-3 rounded-xl'>
                                    <div className='m-2 d-flex w-100 px-0 mx-0'>
                                        <span className='brand-name d-flex align-items-center fs-4'>Dashboard
                                        </span>
                                    </div>
                                    <hr className='text-dark' />

                                    <div className='list-group list-group-flush pt-2 pb-3 dashboard_link_group'>

                                        {sideBarMenuOptions.map((item) => (
                                            <Link onClick={Toggle} key={item.name} className={`${path === item.href ? "active_sidebar_link" : ""} dashboard_link list-group-item pt-4 px-0`} href={item.href}>
                                                <item.icon size={22} className={`me-3`} />
                                                <span className=''>{item.name}</span>
                                            </Link>
                                        ))}

                                    </div>

                                    {user?.metadata.lastSignInTime && <div className="sidenav__footer mt-5">
                                        <span style={{ fontSize: "20px" }}>Last Login</span>
                                        <div className="sidenav__time align-items-center mt-2">
                                            <p className="d-flex gap-3">
                                                <BsCalendar size={24} />
                                                {formatDate(new Date(user.metadata.lastSignInTime))}
                                            </p>
                                            <p className="">{formatTime(new Date(user.metadata.lastSignInTime))}</p>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                            <div className='col-xl-9'>
                                <div className='h-100'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </ThemeProvider>
        </PagesLayout>
    );
}