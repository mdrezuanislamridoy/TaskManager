import { ArrowLeft, ArrowRight, HouseSimple, Link, PaperPlaneRight, Smiley, UserCircle } from "phosphor-react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import chatService from "../../../Services/chatServices"

import socket from "../../socket"

export default function Inbox() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const [update, setUpdate] = useState(false)

    const handleSendMessage = (e) => {
        setUpdate(!update)
        e.preventDefault()
        if (input.trim() === '') {
            alert('Please enter a message')
        } else {
            socket.emit('message', { input, chatId: id, senderId: localStorage.getItem('uid') })
            setMessages(prevMessages => [...prevMessages, { message: input, senderId: localStorage.getItem('uid') }])
        }
    }

    useEffect(() => {
        chatService.loadMessages(id).then((messages) => {
            setMessages(messages)
        })
        socket.on('feedBackMessage', (message, senderId) => {
            setMessages(prevMessages => [...prevMessages, { message, senderId }])
        })
        socket.emit('join', id)
    }, [])


    return (
        <div className="relative flex flex-col h-screen bg-slate-100 ">
            <div className="flex items-center justify-between p-4 space-x-4 bg-white border-b">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-[#050505] hover:bg-[#f0f2f5] rounded-full"
                >
                    <ArrowLeft weight="bold" size={24} />
                </button>
                <h1 className="text-xl font-semibold text-[#050505]">{`Public Chat Room - ${id} `}</h1>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 text-[#050505] hover:bg-[#f0f2f5] rounded-full"
                >
                    <HouseSimple weight="bold" size={24} />
                </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    {messages ? messages.map((message, index) => {
                        return (
                            <div className={`flex items-end w-full ${message.senderId == localStorage.getItem('uid') ? 'justify-end' : 'justify-start'}`} key={index}>
                                {message.senderId != localStorage.getItem('uid') ? (
                                    <div className="flex items-end w-2/3 space-x-2">
                                        <UserCircle size={32} weight="light" className="flex-shrink-0 text-gray-400" />
                                        <div className="w-full p-3 text-gray-800 bg-white border border-gray-300 rounded-2xl rounded-bl-md">
                                            {message.message}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-end w-2/3 space-x-2">
                                        <div className="w-full p-3 text-white bg-gray-800 rounded-2xl rounded-br-md">
                                            {message.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }) : <p>Loading...</p>}
                </div>
            </div>
            <div className="p-4 bg-white border-t">
                <form className="flex items-center space-x-2" onSubmit={handleSendMessage}>
                    <div className="flex items-center space-x-2">
                        <button type="button" className="p-2 text-[#e0e0e0] hover:bg-[#f0f2f5] rounded-full">
                            <Smiley size={24}></Smiley>
                        </button>
                        <button type="button" className="p-2 text-[#bbbbbb] hover:bg-[#f0f2f5] rounded-full">
                            <Link size={24}></Link>
                        </button>
                    </div>
                    <textarea
                        type="text"
                        className="flex-grow p-2 rounded-full bg-[#f0f2f5] focus:outline-none focus:rounded-md resize-none overflow-hidden h-[40px] max-h-[100px]"
                        placeholder="Aa"
                        style={{ height: '40px' }}
                        onInput={(e) => {
                            setInput(e.target.value)
                            e.target.style.height = '40px'
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                    />
                    <button type="submit" className="p-2 text-[#0084ff] hover:bg-[#f0f2f5] rounded-full">
                        <PaperPlaneRight size={24}></PaperPlaneRight>
                    </button>
                </form>
            </div>
        </div>
    )
};
