import { ReactNode } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "./ui/alert-dialog";



interface ConfirmModalProps{
  children:ReactNode;
  title: string;
  handleDelete: () => void;
  disabled:boolean
}



const ConfirmModal = ({children,title,handleDelete,disabled}:ConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription>
          Are you sure you want to delete { title }?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={handleDelete}> 
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default ConfirmModal