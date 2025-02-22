import { Link } from "react-router-dom"

const Error = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-9xl font-bold ">404</h1>
                    <p className="text-2xl font-semibold text-brand-text mt-4">Oops! Page not found</p>
                    <p className="text-lg text-brand-text mt-2">The page you are looking for doesn't exist or has been moved.</p>

                    <div className="mt-8">
                        <Link to={-1}
                            className="px-6 py-3 text-white rounded-full hover:bg-brand-accent transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error