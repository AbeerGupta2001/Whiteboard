import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";



interface HintProps{
label:string;
children: React.ReactNode
side?: "top" | "right" | "bottom" | "left";
align?: "start" | "center" | "end";
sideOffset?: number;
alignOffset?: number;
}

const Hint = ({
    label,
    children,
    side = "top",
    align = "center",
    sideOffset = 4,
    alignOffset = 0, 
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="text-white bg-black border-black" side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Hint