import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ArrowClockwise, Calendar, Check, CheckSquareOffset, MagnifyingGlass, NotePencil, PencilSimple, Plus, SignOut, SortAscending, Trash, UserCircle, Warning, X } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import constants from "../../constant";
import PopUpMessage from "./popUpMessage";
import TaskCard from "./Tasks/TaskBody";
import TodoForm from "./Tasks/TodoForm";
import { useOutletContext } from "react-router-dom";
import TaskContext from "../../Context/taskContext";
import TaskEditor from "./Tasks/TaskEditor";
import todoService from "../../Services/todoService";

function ToDo() {

    const [isFormShown, setIsFormShown] = useOutletContext();

    const [isSearchPageShown, setIsSearchPageShown] = useState(false);



    const serverUrl = constants.serverUrl







    return (
        <div className=" border shadow-2xl h-screen m-auto flex flex-col items-center relative md:w-[480px] md:aspect-[2/3] md:mt-12">






            {isSearchPageShown &&
                <div className="w-full fixed shadow-md rounded p-6 inset-0 backdrop-blur-sm bg-slate-700/10 flex items-start"  >
                    <div className="inset-1 fixed" onClick={() => { setIsSearchPageShown(!isSearchPageShown) }}></div>
                    {/* <div className="w-full shadow-lg z-10 p-8 rounded-2xl"> */}
                    <div className="relative flex items-center w-full ">
                        <input
                            type="text"
                            className="w-full px-6 py-3 pl-12 text-lg focus:outline-none border border-gray-200 rounded-sm hover:shadow-md focus:shadow-lg transition-shadow duration-200 focus:border-gray-300"
                            placeholder="Search tasks..."
                            autoFocus
                        />
                        <div className="absolute left-4 text-gray-400">
                            <MagnifyingGlass size={20} />
                        </div>
                    </div>a
                </div>
            }




        </div>
    );
}

export default ToDo;
