/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login_Signup from "./Pages/Login_Signup";
import TodoPage from "./Pages/TodoPage";
import todoService from "../Services/todoService";
import TaskContext from "../Context/taskContext";
import SplashLoadingPage from "./components/SplashLoadingPage";
import userService from "../Services/userServices";
import UserContext from "../Context/userContext";
import SocialPage from "./Pages/social/SocialPage";
import NotFound from "./Pages/NotFound";
import PeoplePage from "./Pages/social/PeoplePage";
import AllUser from "./Pages/social/AllUser";
import FriendPage from "./Pages/social/Friends";

export default function App() {
    let [isValidUser, setIsValidUser] = useState(true)
    const [tasks, setTasks] = useState(null);
    const [currentUser, setCurrentUser] = useState()


    useEffect(() => {
        const getCurrentUser = async () => {
            const uid = localStorage.getItem('uid')
            const user = await userService.getUser(uid)
            setCurrentUser(user)

        }
        const validateUser = async () => {
            let uid = localStorage.getItem('uid')
            let token = localStorage.getItem('token')
            if (uid && token) {
                const isValid = await userService.isValidUser(uid, token)
                if (!isValid) {
                    setIsValidUser(isValid)
                }
            } else {
                setIsValidUser(false)
            }
        }
        const fetchTasks = async () => {
            try {
                const response = await todoService.fetchTodos()
                const tasks = response.data;
                tasks.sort((a, b) => {
                    const dateComparison = new Date(b.date) - new Date(a.date);
                    if (dateComparison === 0) {
                        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
                    }
                    return dateComparison;
                });
                setTasks(tasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        getCurrentUser()
        validateUser()
        fetchTasks();
    }, [])

    return (
        <div>
            <div>
                {tasks ? <TaskContext.Provider value={{ tasks, setTasks }}>
                    <UserContext.Provider value={{ currentUser }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={isValidUser ? <HomePage></HomePage> : <Navigate to="/auth" />} >
                                    <Route index element={<TodoPage />} />
                                    <Route path="/profile" element={<SocialPage />} />
                                    <Route path="/social" element={<PeoplePage />}>
                                        <Route index element={<Navigate to="/social/alluser" />} />
                                        <Route path="/social/alluser" element={<AllUser />} />
                                        <Route path="/social/allFriends" element={<FriendPage></FriendPage>} />
                                    </Route>

                                </Route>
                                <Route path="/auth" element={!isValidUser ? <Login_Signup></Login_Signup> : <Navigate to="/" />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </UserContext.Provider>
                </TaskContext.Provider> : <SplashLoadingPage />}

            </div>
        </div>
    );
}
