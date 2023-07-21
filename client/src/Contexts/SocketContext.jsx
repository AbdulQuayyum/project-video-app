import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_SERVER_URL}`)

const SocketProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    const MyVideo = useRef();
    const UserVideo = useRef();
    const ConnectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                if (MyVideo.current) {
                    MyVideo.current.srcObject = currentStream;
                }
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from: from, name: callerName, signal: signal });
        });
    }, [MyVideo]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            UserVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        ConnectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: name });
        });

        peer.on('stream', (currentStream) => {
            UserVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        ConnectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        ConnectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                MyVideo,
                UserVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall
            }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, SocketContext }