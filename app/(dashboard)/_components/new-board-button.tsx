"use client"

import { api } from "@/convex/_generated/api";
import { useMutionHook } from "@/hooks/use-mutation-hook";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface NewBoardButtonProps{
    orgId:string;
    disabled?:boolean
}


const NewBoardButton:React.FC<NewBoardButtonProps> = ({orgId,disabled}) => {
    const { mutate,isLoading } = useMutionHook(api.board.create);
    const { toast } = useToast()
    const onClick = () => {
        mutate({
            orgId:orgId,
            title:"Untitled"
        }).then((id)=>{
            toast({
                description:"Board created successfully"
            })
            //Todo: redirect to board
        }).catch(()=>toast({
            description:"Failed to create board"
        }))
    }

  return (
    <button className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6",(disabled || isLoading) && "opacity-75 hover:bg-blue-700 cursor-not-allowed")} disabled={disabled || isLoading} onClick={onClick}>
        <div />
        <Plus className="size-12 text-white stroke-1" />
        <p className="text-sm text-white font-light">
            New board
        </p>
    </button>
  )
}
export default NewBoardButton