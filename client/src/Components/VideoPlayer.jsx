import React, { useContext } from 'react';

import { SocketContext } from '../Contexts/SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, MyVideo, UserVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <div className='flex flex-col gap-8 md:flex-row'>
            {stream && (
                <div className='flex flex-col items-center'>
                    <span className='font-extrabold  text-[#aaa] pb-5'>{name || "Name"}</span>
                    <video playsInline muted ref={MyVideo} autoPlay className="w-full max-w-md rounded-3xl" />
                </div>
            )}
            {callAccepted && !callEnded && (
                <div className='flex flex-col items-center'>
                    <span className='font-extrabold  text-[#aaa] pb-5'>{call.name || "Name"}</span>
                    <video playsInline ref={UserVideo} autoPlay className="w-full max-w-md rounded-3xl" />
                </div>
            )}
        </div>
    )
}

export default VideoPlayer