import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { messageProps } from "@/types/chat";
import SelectedImage from "./SelectedImage";

const UserMessage: FC<messageProps> = ({ message, time }) => {
  const isImageUrl = (url: string ) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp|avif)$/) != null|| url.startsWith("blob:");
  };

  return (
    <div className="max-w-72 p-4 self-end flex flex-col gap-2 overflow-hidden flex-shrink-0">
      <div className="text-sm font-normal text-909098 self-end">
        Visitor <span>{time}</span>
      </div>

      {Array.isArray(message) || isImageUrl(message) ? (
        <SelectedImage source={message} />
      ) : (
        <p className="text-white font-normal text-md bg-blue-500 rounded-lg px-4 py-2 overflow-hidden break-words">
          {message}
        </p>
      )}
    </div>
  );
};

export default UserMessage;
