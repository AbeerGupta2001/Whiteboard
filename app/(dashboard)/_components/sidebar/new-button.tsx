"use client";

import Hint from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
        <Hint label="New Organization" side="right" align="start" sideOffset={18}>
          <button className="bg-white/25 rounded-md h-full w-full flex items-center justify-center opacity-60 hover:opacity-100">
            <PlusIcon className="text-white" />
          </button>
        </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center bg-transparent border-none max-w-[480px] p-0">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
export default NewButton;
