import { useState } from "react";


const PopUpMessage = ({ message  , setMessage}) => { 
    let [showPoppUp, setShowPopUp] = useState(true);
    return (
        <>
            <div className="hidden">
                {
                    message && setTimeout(() => {
                        setMessage(null);
                        setShowPopUp(false);
                    }, 3000)
                }
            </div>
            {showPoppUp && <p className=" flex items-center gap-3 shadow-xl justify-between text-nowrap mb-6 text-sm text-center font-semibold fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white px-4 py-3 rounded-md z-50 ">
                {message}
            </p>}
        </>
    );
};

export default PopUpMessage;