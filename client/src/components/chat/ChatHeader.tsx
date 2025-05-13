import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { CurrentChatType } from "../../types/chat.types";
import { useSocket } from "../../hooks/context/useSocket";

type ChatHeaderProps = {
  currentChat: CurrentChatType;
};

const ChatHeader = ({ currentChat }: ChatHeaderProps) => {
  const { onlineUsers, typingUsers } = useSocket();

  return (
    <nav className="flex justify-between bg-[#F8FAFF] px-4">
      <div className="flex rounded-lg py-3  gap-3">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={currentChat?.avatar}
          alt=""
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-[13px] font-semibold text-[#030303]">{currentChat?.firstName}</h4>
          <p className="text-xs text-[#7C7C7D]">
            {!onlineUsers.includes(currentChat?._id)
              ? "offline"
              : typingUsers.includes(currentChat?._id)
              ? "typing..."
              : "online"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <VideoCamera className="cursor-pointer" size={21} />
        <Phone className="cursor-pointer" size={21} />
        <MagnifyingGlass className="cursor-pointer" size={21} />
        <div className="border-[1px] h-10"></div>
        <CaretDown className="cursor-pointer" size={21} />
      </div>
    </nav>
  );
};

export default ChatHeader;
