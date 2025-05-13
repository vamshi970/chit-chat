import { groups } from "../../utils/constants";
import { GroupType } from "../../types/chat.types";

const Groups = () => {
  return (
    <div>
      <div className="py-3">
        <p className="text-[13px] font-semibold text-[#676667]">Pinned</p>

        {groups.map((e:GroupType, index:number) => {
          return (
            <div
              // onContextMenu={(e) => onMenuClick(e)}
              key={index}
              className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
            >
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={e.src}
                alt=""
              />

              <div className="flex flex-col justify-center">
                <h4 className="text-[13px] font-semibold text-[#030303]">
                  {e.name}
                </h4>
                <p className="text-xs text-[#7C7C7D]">{e.content}</p>
              </div>

              <div className="flex flex-col justify-center ml-auto gap-1">
                <p className="text-[10px] text-[#686768] font-[580]">9:36 PM</p>

                <p
                  className={` ${
                    index % 2 ? "" : "hidden"
                  } rounded-full text-center w-[14px] h-[14px] bg-[#5B96F7] text-white text-[10px] ml-auto`}
                >
                  {index}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-4">
        <p className="text-[13px] font-semibold text-[#676667]">All Chats</p>

        {groups.map((e:GroupType, index:number) => {
          return (
            <div
              key={index}
              className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
            >
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={e.src}
                alt=""
              />

              <div>
                <h4 className="text-[13px] font-semibold text-[#030303]">
                  {e.name}
                </h4>
                <p className="text-xs text-[#7C7C7D]">{e.content}</p>
              </div>

              <p className="text-[10px] text-[#686768] font-[580] ml-auto">
                9:36 PM
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Groups;
