"use client"

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps{
    id:string;
    onLayerPointDown: (e:React.PointerEvent,layerId:string)=>void;
    selectionColor?:string;
}


export const LayerPreview = memo(({id,onLayerPointDown,selectionColor}:LayerPreviewProps)=>{

    const layer = useStorage((root)=> root.layers.get(id))

    if(!layer){
        return null 
    }

    switch (layer.type){
        case LayerType.Rectangle:
            return (
                <Rectangle id={id} onPointerDown={onLayerPointDown} layer={layer} selectionColor={selectionColor} />
            );
        
        default:
            console.log("Unknown layer type");
            return null;
    }
})

LayerPreview.displayName = "LayerPreview"

