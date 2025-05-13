import React, { useState } from "react";
import Search from "../ui/Search";
import { ArchiveBox, CaretLeft, Plus } from "phosphor-react";
import { DashboardType, DashboardEnum } from "../../types/chat.types";
import CreateGroupModal from "../groups/CreateGroupModal";

type DashboardHeaderProps = {
  currentTab: DashboardType;
  setCurrentTab: React.Dispatch<React.SetStateAction<DashboardType>>;
};

const DashboardHeader = ({ currentTab, setCurrentTab }: DashboardHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={` ${
        currentTab !== DashboardEnum.Archived && currentTab !== DashboardEnum.Contacts
          ? "pb-3 border-b-[1px]"
          : ""
      }`}
    >
      <div
        className={`flex items-center ${
          currentTab !== DashboardEnum.Archived ? "justify-between" : "gap-3"
        }`}
      >
        {currentTab === DashboardEnum.Archived && <CaretLeft className="cursor-pointer" onClick={() => setCurrentTab(DashboardEnum.Conversations)} size={28} />}
        <h1 className="font-bold text-[30px] ">
          {currentTab === DashboardEnum.Conversations && "Chats"}
          {currentTab === DashboardEnum.Groups && "Groups"}
          {currentTab === DashboardEnum.Contacts && "Contacts"}
          {currentTab === DashboardEnum.Archived && "Archived"}
        </h1>
        {currentTab !== DashboardEnum.Archived && (
          <span className="w-6 h-6 border-[#676667] border-2 rounded-full border-dashed"></span>
        )}
      </div>

      <Search />

      {currentTab === "Conversations" && (
        <div
          onClick={() => setCurrentTab(DashboardEnum.Archived)}
          className="cursor-pointer flex gap-3 items-center"
        >
          <ArchiveBox size={22} />
          <p className="text-[#709CE6] text-[13px] font-semibold">Archived</p>
        </div>
      )}

      {currentTab === "Groups" && (
        <div
          onClick={showModal}
          className="text-[#709CE6] cursor-pointer flex px-2 gap-2 items-center"
        >
          <p className="font-medium text-[13px]">Create New Group</p>
          <Plus size={16} />
        </div>
      )}

      <CreateGroupModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default DashboardHeader;
