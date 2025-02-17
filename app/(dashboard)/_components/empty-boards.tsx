import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useMutionHook } from "@/hooks/use-mutation-hook"
import {  useToast } from "@/hooks/use-toast"
import { useOrganization } from "@clerk/nextjs"
import Image from "next/image"

const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { isLoading,mutate } = useMutionHook(api.board.create)
  const { toast } = useToast()
  const onClick = () =>{
    if(!organization) return
    mutate({
      orgId: organization.id,
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
    <div className="h-full flex flex-col items-center justify-center">
            <Image src="/notebook.png" alt="Empty" width={140} height={140} />
            <h2 className="text-2xl font-semibold mt-6">
                No boards found
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try creating a board
            </p>
            <Button onClick={onClick} disabled={isLoading} size="lg" className="mt-2">
                Create board
            </Button>
        </div>
  )
}
export default EmptyBoards