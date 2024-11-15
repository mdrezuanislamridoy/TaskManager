import { Calendar } from "phosphor-react"



const TaskBody = ({ task }) => {
    return (
        <div className="space-y-2">
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                {task.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 border-b border-gray-100 pb-2">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(task.date).toLocaleDateString()}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-100 cursor-pointer whitespace-pre-wrap">
                {task.description}
            </p>
        </div>
    )
}

export default TaskBody