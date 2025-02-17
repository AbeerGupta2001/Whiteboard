"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EditIcon, Link2, TrashIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMutionHook } from "@/hooks/use-mutation-hook";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import RenameModal from "./rename-modal";

interface ActionsProps {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { mutate, isLoading } = useMutionHook(api.board.deleteBoard);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast({
          description: "Link copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          description: "Failed to copy link",
        });
      });
  };

  const handleDelete = () => {
    mutate({
      id: id,
    })
      .then(() => {
        toast({
          description: "Board deleted successfully",
        });
      })
      .catch(() => {
        toast({
          description: "Failed to delete board",
        });
      });
  };



  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-3 z-50" asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="mr-2 h-4 w-4" />
          Copy board link
        </DropdownMenuItem>
        <ConfirmModal
          title={title}
          handleDelete={handleDelete}
          disabled={isLoading}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            className="p-3 cursor-pointer"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Remove
          </DropdownMenuItem>
        </ConfirmModal>
        <RenameModal
          title={title}
          id={id}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            className="p-3 cursor-pointer"
          >
            <EditIcon className="mr-2 h-4 w-4" />
            Rename
          </DropdownMenuItem>
        </RenameModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
