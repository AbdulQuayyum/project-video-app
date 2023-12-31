import React, { useContext } from 'react';

import { SocketContext } from '../Contexts/SocketContext'

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div className='flex items-center justify-end gap-4'>
                    <span className='font-extrabold  text-[#aaa]'>{call.name} is calling:</span>
                    <button
                        className='px-8 py-3 text-sm text-white transition-all bg-green-500 border border-green-500 rounded-full hover:bg-white hover:text-green-500 dark:bg-white dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'
                        onClick={answerCall}>
                        Answer
                    </button>
                </div>
            )}
        </>
    )
}

export default Notifications