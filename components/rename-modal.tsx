import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutionHook } from "@/hooks/use-mutation-hook";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";


interface RenameModalProps{
    children:ReactNode;
    title: string;
    id:string;
}



const RenameModal = ({children,title,id}:RenameModalProps) => {
    const [value,setValue] = useState(title)
    const [open,setOpen] = useState(false)
    const { mutate,isLoading } = useMutionHook(api.board.rename)
    const handleRename = () => {
        mutate({
            id,title:value
        }).then(()=> {toast({description:"Board renamed"});
    setOpen(false)}).catch(()=>toast({
            description:"Failed to rename board"
        }))
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Rename
                </DialogTitle>
            </DialogHeader>
            <div>
                <Input value={value} onChange={(e:ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)} />
            </div>
            <DialogFooter className="gap-4">
                <DialogClose onClick={()=>setOpen(false)}>
                    Cancel
                </DialogClose>
                <Button disabled={isLoading} onClick={handleRename}>
                    Update
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
export default RenameModal