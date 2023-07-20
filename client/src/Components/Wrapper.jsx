import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LuCopy, LuPhone, LuPhoneOff } from "react-icons/lu"

import { SocketContext } from '../Contexts/SocketContext'

const Wrapper = ({ children }) => {
    const { me, callAccepted, name, setName, CallEnded, LeaveCall, CallUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div className='flex justify-center mx-auto'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col' >
                    <div className='my-4'>
                        <span className='font-extrabold  text-[#aaa]'>Account Info</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Username"
                            className="w-full p-2 text-lg transition-all duration-500 border-2 border-gray-200 outline-none rounded-xl dark:bg-transparent dark:border-2 dark:rounded-lg dark:border-white"
                        />
                    </div>

                    <div className='flex justify-end'>
                        <CopyToClipboard text={me} className='flex items-center gap-2 px-8 py-3 text-sm text-white transition-all bg-black border border-black rounded-full hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'>
                            <button className='flex items-center gap-2 px-8 py-3 text-sm text-white transition-all bg-black border border-black rounded-full hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'>
                                <LuCopy />
                                Copy your ID
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div>
                    <div className='my-4'>
                        <span className='font-extrabold  text-[#aaa]'>Make a call</span>
                        <input
                            type="text"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                            placeholder="ID to call"
                            className="w-full p-2 text-lg transition-all duration-500 border-2 border-gray-200 outline-none rounded-xl dark:bg-transparent dark:border-2 dark:rounded-lg dark:border-white"
                        />
                    </div>
                    {callAccepted && !CallEnded ? (
                        <div className='flex justify-end'>
                            <button
                                onClick={LeaveCall}
                                className='flex items-center gap-2 px-8 py-3 text-sm text-white transition-all bg-black border border-black rounded-full hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'>
                                <LuPhoneOff />
                                Hang Up
                            </button>
                        </div>
                    ) : (
                        <div className='flex justify-end'>
                            <button
                                onClick={() => CallUser(idToCall)}
                                className='flex items-center gap-2 px-8 py-3 text-sm text-white transition-all bg-black border border-black rounded-full hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'>
                                <LuPhone />
                                Call
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Wrapper