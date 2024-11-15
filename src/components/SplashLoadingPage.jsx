




const SplashLoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            <p className="text-gray-700 mt-4">Loading...</p>
        </div>
    );
};
export default SplashLoadingPage;