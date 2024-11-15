/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import HomePage from "./Pages/HomePage";
import Login_Signup from "./Pages/Login_Signup";
import ToDo from "./components/todo-old-deprecated";
import Header from "./components/Header";
import axios from "axios";
import ProfilePage from "./Pages/ProfilePage";
import TodoPage from "./Pages/TodoPage";
import todoService from "../Services/todoService";
import TaskContext from "../Context/taskContext";
import SplashLoadingPage from "./components/SplashLoadingPage";
import userService from "../Services/userServices";

export default function App() {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    const [tasks, setTasks] = useState(null);


    useEffect(() => {
        async function validateUser() {
            let user = await userService.isValidUser(uid, token);
            if (!user) {
                localStorage.removeItem("token");
                localStorage.removeItem("uid");
                window.location.href = "/login";
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
        validateUser();
        fetchTasks();
    }, [])

    return (
        <div>
            <div>
                {tasks ? <TaskContext.Provider value={{ tasks, setTasks }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={token ? <HomePage></HomePage> : <Navigate to="/auth" />} >
                                <Route index element={<TodoPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                            </Route>
                            <Route path="/auth" element={<Login_Signup />} />
                        </Routes>
                    </BrowserRouter>
                </TaskContext.Provider> : <SplashLoadingPage />}

            </div>
        </div>
    );
}
