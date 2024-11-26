import { House, LinkBreak, MagnifyingGlass, Warning } from "phosphor-react";
import { Link } from "react-router-dom";




const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 ">
            <div className="p-8 space-y-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                    <LinkBreak size={48} weight="light" className="text-red-500" />
                    <Warning size={48} weight="light" className="text-orange-500" />
                </div>
                <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                <p className="text-xl text-gray-600">Oops! We couldn't find the page you're looking for</p>
                <div className="flex items-center justify-center space-x-4 ">
                    <Link to="/" className="flex items-center px-6 py-3 space-x-2 text-xl text-blue-900 transition-colors duration-200 rounded-lg hover:underline">
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;