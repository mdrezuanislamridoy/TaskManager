import { ArrowLeft, ArrowRight, HouseSimple, Link, PaperPlaneRight, Smiley, UserCircle } from "phosphor-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import chatService from "../../../Services/chatServices"

import socket from "../../socket"
import UserContext from "../../../Context/userContext"

export default function Inbox() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState()
    const [chat, setChat] = useState(null)
    const [update, setUpdate] = useState(false)

    const { currentUser } = useContext(UserContext)

    const messagesEndRef = useRef(null); // Ref for the bottom of the message list
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the ref
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        setUpdate(!update)
        e.preventDefault()
        if (input.trim() === '') {
            alert('Please enter a message')
        } else {
            socket.emit('message', { text: input, chatId: id, sender: { _id: localStorage.getItem('uid'), name: currentUser.name }, timestamp: new Date().toLocaleString() })
            setMessages(prevMessages => [...prevMessages, { text: input, sender: { _id: localStorage.getItem('uid') }, timestamp: new Date().toLocaleString() }])
            if (inputRef.current) {
                inputRef.current.value = null;
                inputRef.current.focus();
                setInput('');
            }
        }
    }


    useEffect(() => {
        chatService.getChatInfo(id)
            .then((chatData) => {
                console.log(chatData.members);
                console.log(chatData.members[1].name);
                setChat(chatData);
            })
            .catch((error) => {
                console.error("Error fetching chat info:", error);
            });
        chatService.loadMessages(id)
            .then((messages) => {
                setMessages(messages);
                console.log(`Loaded messages for chat ID ${id}:`, messages);
            })
            .catch((err) => {
                console.error(`Error loading messages for chat ID ${id}:`, err);
                setMessages([]); // Reset messages in case of failure
            });

        socket.on('feedBackMessage', (text, sender) => {
            console.log(sender);
            setMessages(prevMessages => [...prevMessages, { text, sender, timestamp: new Date().toLocaleString() }])
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
                <h1 className="text-xl font-semibold text-[#050505] text-center">
                    {chat?.members?.find(member => member._id !== localStorage.getItem('uid'))?.name}
                    <span className="block text-xs text-gray-500">
                        {id}
                    </span>
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 text-[#050505] hover:bg-[#f0f2f5] rounded-full"
                >
                    <HouseSimple weight="bold" size={24} />
                </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto " >
                <div className="flex flex-col h-full space-y-4 overflow-y-auto" >
                    {messages ? messages.map((message, index) => {
                        return (
                            <div className={`flex items-end w-full ${message.sender._id == localStorage.getItem('uid') ? 'justify-end' : 'justify-start'}`} key={index}>
                                {message.sender._id != localStorage.getItem('uid') ? (
                                    <div className="flex items-end w-full space-x-2">
                                        <UserCircle size={32} weight="light" className="flex-shrink-0 text-gray-400" />
                                        <div className="flex flex-col space-y-1">
                                            <span className="ml-2 text-sm text-gray-500">{message.sender.name} • {new Date(message.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                            <div className="p-3 text-gray-800 break-words break-all bg-white border border-gray-300 shadow-sm rounded-2xl rounded-bl-md ">
                                                {message.text.split(/\s+/).map((word, i) => {
                                                    if (word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) {
                                                        return (
                                                            <span key={i}>
                                                                <a href={word.startsWith('http') ? word : `https://${word}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:underline">
                                                                    {word}
                                                                </a>{' '}
                                                            </span>
                                                        )
                                                    }
                                                    return word + ' '
                                                })}
                                            </div>
                                            {message.text.split(/\s+/).some(word => word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) && (
                                                <div className="mt-2 overflow-hidden border border-gray-200 rounded-lg">
                                                    {message.text.split(/\s+/).map((word, i) => {
                                                        if (word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) {
                                                            const url = word.startsWith('http') ? word : `https://${word}`
                                                            return (
                                                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block p-4 transition-colors duration-200 hover:bg-gray-50">
                                                                    <div className="flex items-center space-x-4">
                                                                        <div className="flex-shrink-0">
                                                                            <img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="favicon" className="w-6 h-6 rounded-full shadow-sm" />
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-sm font-medium text-gray-900 truncate">{new URL(url).hostname}</div>
                                                                            <div className="text-xs text-gray-500 truncate">Visit website</div>
                                                                        </div>
                                                                        <div className="flex-shrink-0 text-gray-400">
                                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            )
                                                        }
                                                        return null
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-end space-y-1">
                                        <span className="mr-2 text-sm text-gray-500">You • {new Date(message.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })} </span>
                                        <div className="w-full p-3 text-white break-words break-all shadow-sm bg-slate-600 rounded-2xl rounded-br-md">
                                            {message.text.split(/\s+/).map((word, i) => {
                                                if (word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) {
                                                    return (
                                                        <span key={i}>
                                                            <a href={word.startsWith('http') ? word : `https://${word}`} target="_blank" rel="noopener noreferrer" className="text-blue-100 underline hover:underline">
                                                                {word}
                                                            </a>{' '}
                                                        </span>
                                                    )
                                                }
                                                return word + ' '
                                            })}
                                        </div>
                                        {message.text.split(/\s+/).some(word => word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) && (
                                            <div className="mt-2 overflow-hidden border border-gray-200 rounded-lg">
                                                {message.text.split(/\s+/).map((word, i) => {
                                                    if (word.match(/^(https?:\/\/|www\.)|^[a-zA-Z0-9]+\.[a-zA-Z]{2,}/)) {
                                                        const url = word.startsWith('http') ? word : `https://${word}`
                                                        return ( 
                                                            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block p-4 transition-colors duration-200 hover:bg-gray-50">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="favicon" className="w-6 h-6 rounded-full shadow-sm" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">

                                                                        <div className="text-sm font-medium text-gray-900 truncate">{new URL(url).hostname}</div>
                                                                        <div className="text-xs text-gray-500 truncate">Visit website</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-gray-400">
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        )
                                                    }
                                                    return null
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    }) : <p className="flex items-center justify-center h-full text-center"> Loading...</p>}
                    <div ref={messagesEndRef}></div>
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
                        ref={inputRef}
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
