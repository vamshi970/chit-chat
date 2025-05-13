import {
  // AddressBook,
  Link,
  // NavigationArrow,
  Smiley,
  TelegramLogo,
  // Image,
  // FileText,
} from "phosphor-react";
import useChat from "../../hooks/context/useChat";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
// import documentImage from "../../assets/images/document.png";
// import mediaImage from "../../assets/images/media.png";
// import locationImage from "../../assets/images/location.png";
// import contactImage from "../../assets/images/contact.png";
import { fileInput } from "../../utils/constants";

const SendMessage = () => {
  const { handleChange, message, handleKeyDown, handleSendMessage, setMessage } = useChat();

  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<boolean>(false);

  const attachmentsRef = useRef<HTMLDivElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (attachmentsRef.current && !attachmentsRef.current.contains(event.target as Node)) {
      setAttachments(false);
    }
    if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
      setEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex my-4 mx-4 gap-3">
      <div className="flex flex-1 rounded-xl py-2 gap-2 items-center px-3 bg-[#EAF2FE] text-[#709CE6]">
        <div ref={attachmentsRef} className="relative">
          {attachments && (
            <div className="absolute bottom-[110%] px-1 bg-white rounded-md">
              <div className="flex pr-9 pl-2  gap-3 cursor-pointer  hover:bg-slate-50 my-2 ">
                {/* <img className="h-6" src={documentImage} alt="" /> */}
                <input
                  type="file"
                  multiple={true}
                  placeholder="Document"
                  name="document"
                  id="document"
                  accept={fileInput}
                />
              </div>
              <div className="flex pr-9 pl-2 gap-3 cursor-pointer hover:bg-slate-50 my-2 p-1">
                {/* <img className="h-6" src={mediaImage} alt="" /> */}
                <input
                  type="file"
                  multiple={true}
                  placeholder="Media"
                  name="media"
                  id="media"
                  accept="image/*,audio/*,video/*"
                />
              </div>
              <div className="flex pr-9 pl-2 gap-3 cursor-pointer hover:bg-slate-50 my-2 p-1">
                {/* <img className="h-6" src={contactImage} alt="" /> */}
                <p>Contact</p>
              </div>
              <div className="flex pr-9 pl-2 gap-3 cursor-pointer hover:bg-slate-50 my-2 p-1">
                {/* <img className="h-6" src={locationImage} alt="" /> */}
                <p>Location</p>
              </div>
            </div>
          )}
          <Link
            onClick={() => setAttachments((prev) => !prev)}
            className="cursor-pointer"
            size={32}
          />
        </div>

        <input
          type="text"
          name="send-message"
          value={message}
          onChange={(e) => handleChange(e)}
          id="send-message"
          className="block flex-1  border-0
          bg-transparent sm:text-sm placeholder:text-[#709CE6] sm:leading-6 focus:outline-none"
          placeholder="Write a message..."
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
        <div ref={emojiRef} className="relative">
          <EmojiPicker
            lazyLoadEmojis={true}
            onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
            searchDisabled={true}
            skinTonesDisabled={true}
            height={350}
            emojiStyle={EmojiStyle.FACEBOOK}
            style={{ position: "absolute", bottom: "100%", right: 0 }}
            open={emojiPicker}
          />

          <Smiley
            onClick={() => setEmojiPicker((prev) => !prev)}
            className="cursor-pointer"
            size={32}
          />
        </div>
      </div>
      <div
        onClick={handleSendMessage}
        className="bg-messageRight rounded-xl cursor-pointer px-3 py-3"
      >
        <TelegramLogo className="text-white" size={22} />
      </div>
    </div>
  );
};

export default SendMessage;
