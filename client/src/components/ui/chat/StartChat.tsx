import { Lock } from "phosphor-react";

const StartChat = () => {
  return (
    <div className="flex items-end justify-center h-full">
      <div className="bg-gray-300 rounded-md px-3 py-1 flex gap-1 items-center">
        <Lock size={12} />
        <h1 className="text-xs text-gray-700">
          Messages are end-to-end encrypted 
        </h1>
      </div>
    </div>
  );
};

export default StartChat;
