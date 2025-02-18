"use client";

import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { EllipsisVertical } from "lucide-react";
import { useMutionHook } from "@/hooks/use-mutation-hook";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";

interface BoardCardProps {
  id: Id<"boards">;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  authorId,
  authorName,
  title,
  imageUrl,
  createdAt,
  id,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? "You" : authorName
  const createdAtLabel = formatDistanceToNow(createdAt,{
    addSuffix:true});

    const { mutate:onFavorite,isLoading: loadingFavorite } = useMutionHook(api.board.favorites)
    const { mutate:onUnFavorite,isLoading: loadingUnFavorite } = useMutionHook(api.board.unfavorites);

    const toggleFavorite = () => {
      if(isFavorite){
        onUnFavorite({id:id}).catch(()=> toast({
          description:"Failed to unfavorite"
        }))
      }else{
        onFavorite({id,orgId}).catch(()=> toast({
          description: "Failed to favorite"
        }))
      }
    }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay/>
          <Actions side="right" id={id} title={title}>
            <button className="outline-none absolute top-3 right-3 z-50">
              <EllipsisVertical className="size-6 text-white" />
            </button>
          </Actions>
        </div>
        <Footer isFavorite={isFavorite} title={title} authorLabel={authorLabel} createdAtLabel={createdAtLabel} onClick={toggleFavorite} disabled={loadingFavorite || loadingUnFavorite} />
      </div>
    </Link>
  );
};
export default BoardCard;


BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  )
}
