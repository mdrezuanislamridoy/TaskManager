import { Spinner } from "phosphor-react";





const SplashLoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Spinner size={48} className="animate-spin"/>
            <p className="text-gray-700 mt-4">Loading...</p>
        </div>
    );
};
export default SplashLoadingPage;