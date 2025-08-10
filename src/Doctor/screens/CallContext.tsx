// CallContext.tsx
import React, { createContext, useContext, useRef, useState } from 'react';
import { mediaDevices, RTCPeerConnection } from 'react-native-webrtc';

const CallContext = createContext(null);

export const CallProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(null);

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);
    return stream;
  };

  const createPeerConnection = () => {
    pc.current = new RTCPeerConnection();
    pc.current.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };
    return pc.current;
  };

  return (
    <CallContext.Provider
      value={{
        startLocalStream,
        createPeerConnection,
        pc: pc.current,
        localStream,
        remoteStream,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

// ✅ SAFETY: prevent null access
export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
