
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../../../Context/userContext";
import userService from "../../../Services/userServices";


const CoverPicture = ({ url }) => {
    return (
        <div className="h-64 w-full relative p-5 md:pb-0">
            <img src={url} alt="Cover" className="w-full h-full object-cover rounded-md" />
        </div>
    )
}
export const Avater = ({ url, className }) => {
    return (
        <div className={className + " relative   md:-mt-0 z-10"} >
            <img src={url} alt="Profile"
                className={" w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"} />
        </div>
    )
}

const AboutUser = ({ userData }) => {
    return (
        <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600 mt-1">{userData.email}</p>
            <div className="flex justify-center md:justify-start space-x-8 mt-4">
                <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">250</span>
                    <span className="text-gray-600 text-sm">Following</span>
                </div>
                <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">1.2K</span>
                    <span className="text-gray-600 text-sm">Followers</span>
                </div>
            </div>
        </div>
    )
}
const SocialPage = () => {
    const { uid } = useParams();
    const { currentUser } = useContext(UserContext);
    const [friendsData, setFriendsData] = useState([]);

    console.log(currentUser);

    useEffect(() => {
        const loadFriendsData = async () => {
            if (currentUser?.friends) {
                const friendsDetails = await Promise.all(
                    currentUser.friends.map(friendUid => userService.getUser(friendUid))
                );
                setFriendsData(friendsDetails);
            }
        };
        loadFriendsData();
    }, [currentUser]);

    return (

        <div className="profile-page">
            {currentUser ? (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <CoverPicture url={"https://th.bing.com/th/id/OIP.t7rXFH540HcjcXek9VR-FAHaEK?rs=1&pid=ImgDetMain"}></CoverPicture>
                    <div className="px-6 py-8">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                            <Avater url='https://avatars.githubusercontent.com/u/106436211?v=4' className='-mt-28' > </Avater>
                            <AboutUser userData={currentUser}></AboutUser>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to my profile! I'm passionate about technology and innovation.
                            </p>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Friends</h3>
                            <div className="flex items-center">
                                {friendsData.map((friend, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <img src={friend.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                            alt={friend.name}
                                            className="w-20 h-20 rounded-full object-cover" />
                                        <p className="mt-2 text-sm font-medium text-gray-900">{friend.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-lg text-gray-600">Loading user...</p>
                </div>
            )}
        </div>)
}
export default SocialPage