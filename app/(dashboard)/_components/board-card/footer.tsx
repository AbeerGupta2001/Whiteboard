import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { MouseEvent } from "react";


interface FooterProps{
    title:string;
    isFavorite: boolean;
    authorLabel:string;
    createdAtLabel:string;
    onClick: () => void;
    disabled: boolean;
}

const Footer:React.FC<FooterProps> = ({title,authorLabel,createdAtLabel,onClick,isFavorite,disabled}) => {

  const handleClick = (event:MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  }
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-muted-foreground">
        {authorLabel} , {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn("absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-blue-500", disabled && "opacity-75")}
      >
        <StarIcon className={cn("h-4 w-4", isFavorite && "text-blue-600 fill-blue-600")} />
      </button>
    </div>
  );
}
export default Footer