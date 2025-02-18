"use client";

import { Actions } from "@/components/actions";
import Hint from "@/components/hint";
import RenameModal from "@/components/rename-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

const Info = ({ boardId }: InfoProps) => {
  const board = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!board) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 py-1.5 h-15 flex items-center shadow-md">
      <Link href="/" className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="font-semibold text-xl ml-2 text-black">
          Whiteboard
        </span>
      </Link>
      <TabSeparator />
      <RenameModal id={board._id} title={board.title}>
        <Button
          variant="ghost"
          className="px-2"
          onClick={(e) => e.stopPropagation()}
        >
          {board.title}
        </Button>
      </RenameModal>
      <TabSeparator/>
      <Actions id={board._id} title={board.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
              <Menu/>
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};
export default Info;

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
