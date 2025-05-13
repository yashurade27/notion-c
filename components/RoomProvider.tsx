'use client'

import  {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";


const RoomProvider = ({roomId, children}:{
    roomId: string;
    children: React.ReactNode;
}) => {
  return (
    <RoomProviderWrapper
    id={roomId}
        initialPresence={{ cursor: { x: 0, y: 0 } }}>
        <ClientSideSuspense fallback={<LoadingSpinner/>}>
        <LiveCursorProvider>
            {children}
        </LiveCursorProvider>
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}

export default RoomProvider
