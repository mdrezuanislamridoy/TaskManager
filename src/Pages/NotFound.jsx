import { House, LinkBreak, MagnifyingGlass, Warning } from "phosphor-react";
import { Link } from "react-router-dom";




const NotFound = () => {
    return (

        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 ">
            <div className="text-center space-y-6 p-8">
                <div className="flex items-center justify-center space-x-3">
                    <LinkBreak size={48} weight="light" className="text-red-500" />
                    <Warning size={48} weight="light" className="text-orange-500" />
                </div>
                <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                <p className="text-xl text-gray-600">Oops! We couldn't find the page you're looking for</p>
                <div className="flex items-center justify-center space-x-4 ">
                    <Link to="/" className="flex items-center space-x-2 px-6 py-3 text-blue-900 text-xl hover:underline rounded-lg transition-colors duration-200">
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;