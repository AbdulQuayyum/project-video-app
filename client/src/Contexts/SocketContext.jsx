import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_SERVER_URL}`)

const SocketProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [CallEnded, setCallEnded] = useState(false);
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

                if (MyVideo.current) 
                {
                    MyVideo.current.srcObject = currentStream;
                }
            
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [])

    const AnswerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('AnswerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            UserVideo.current.srcObject = currentStream.streams[0]
        });

        peer.signal(call.signal);

        ConnectionRef.current = peer;
    };

    const CallUser = () => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('CallUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            UserVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        ConnectionRef.current = peer;
    }

    const LeaveCall = () => {
        setCallEnded(true);

        ConnectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{ call, callAccepted, MyVideo, UserVideo, stream, name, setName, CallEnded, me, CallUser, LeaveCall, AnswerCall }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, SocketContext }