



const TaskEditor = ({ singleTaskTitle ,setSingleTaskTitle , singleTaskDescription , setSingleTaskDescription }) => {
    return(
        <div className="space-y-3 p-2 bg-gray-50 rounded-lg">
            <input
                type="text"
                value={singleTaskTitle}
                onChange={(e) => setSingleTaskTitle(e.target.value)}
                className="w-full text-lg font-semibold px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                autoFocus
            />
            <textarea
                value={singleTaskDescription}
                onChange={(e) => setSingleTaskDescription(e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
        </div>
    )
}

export default TaskEditor;