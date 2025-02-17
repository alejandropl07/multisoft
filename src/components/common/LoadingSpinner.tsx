"use client"

interface LoadingSpinnerProps {
    message?: string
    size?: "sm" | "md" | "lg",
    fill?: boolean;
    full?: boolean;
}

export default function LoadingSpinner({ message = "Loading...", size = "lg", fill, full }: LoadingSpinnerProps) {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        < div id="preloader" className={`preloader preloader-static preloader-${size} ${fill ? "preloader-fill" : ""} ${full ? "preloader-full" : ""}`}>
            <div className="animation-preloader">
                <div className={`spinner spinner-${size}`}></div>
                <p className={`text-center mt-3 title-${size} ${message !== "Loading..." ? "title-message" : ""}`}>{message}</p>
            </div>
        </div >
    )

    /* return (
        <div className="d-flex flex-fill justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <span className="text-muted mt-3">Loading...</span>
        </div>
    ) */
}