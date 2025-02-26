"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

export function Room({ children,roomId,fallback }: { children: ReactNode,roomId:string,fallback:ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider id={roomId} initialPresence={{
        cursor:null,selection:[]
      }}
      initialStorage={{
        layers: new LiveMap<string,LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}