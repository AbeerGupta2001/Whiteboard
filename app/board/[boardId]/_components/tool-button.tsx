"use client"

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";


interface ToolButtonProps{
    label:string;
    icon: LucideIcon;
    onClick: ()=> void;
    isActive?: boolean;
    isDisabled?: boolean;
}

const ToolButton = ({icon:Icon,label,onClick,isActive,isDisabled}:ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
        <Button onClick={onClick} disabled={isDisabled} size={"icon"} variant={isActive ? "boardActive" : "board"}>
            <Icon/>
        </Button>
    </Hint>
  )
}
export default ToolButton

