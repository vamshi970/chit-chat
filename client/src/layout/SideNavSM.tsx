import { ChatCircleDots, Users, Phone, Gear, Bell } from "phosphor-react";
import logo from "../assets/images/logo.svg";
import { DashboardType, DashboardEnum } from "../types/chat.types";
import useAuth from "../hooks/context/useAuth";
import NotificationsModal from "../components/dashboard/NotificationsModal";
import { useState } from "react";
import UserProfileOverlay from "../components/dashboard/UserProfileOverlay";

type SideNavSMProps = {
  currentTab: DashboardType;
  setCurrentTab: React.Dispatch<React.SetStateAction<DashboardType>>;
};

const SideNavSM = ({ currentTab, setCurrentTab }: SideNavSMProps) => {
  const { user } = useAuth();

  console.log(user);

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <nav className="flex px-3 border-2 h-screen flex-col items-center justify-between bg-[#F0F4FA]">
      <div className="flex  flex-col items-center">
        <div className="py-6 gap-6 border-b-2 w-1/2 border-[#B4B4B4] flex flex-col items-center b-2">
          <div className="h-16 mb-4 w-16 bg-[#AFBBF7] rounded-xl flex justify-center items-center">
            <img src={logo} alt="" className="w-10 h-10" />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Conversations)}
            className={`h-12 w-12 cursor-pointer rounded-xl flex justify-center items-center ${
              currentTab === DashboardEnum.Conversations || currentTab === DashboardEnum.Archived
                ? "bg-[#5B96F7] text-white"
                : ""
            }`}
          >
            <ChatCircleDots size={23} />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Groups)}
            className={`h-12 w-12 cursor-pointer rounded-xl  flex justify-center items-center ${
              currentTab === DashboardEnum.Groups ? "bg-[#5B96F7] text-white" : ""
            }`}
          >
            <Users size={23} />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Contacts)}
            className={`h-12 w-12 cursor-pointer rounded-xl  flex justify-center items-center ${
              currentTab === DashboardEnum.Contacts ? "bg-[#5B96F7] text-white" : ""
            }`}
          >
            <Phone size={23} />
          </div>
        </div>
        <div className="h-10 w-10 cursor-pointer  flex justify-center items-center mt-5">
          <Gear size={23} />
        </div>
      </div>

      <div className="flex  flex-col items-center gap-4 my-10">
        <div
          onClick={() => setOpenNotifications(true)}
          className="h-10 w-10 cursor-pointer  flex justify-center items-center relative"
        >
          {user?.notifications && user.notifications.length !== 0 && (
            <span className="text-xs w-4 h-4 text-center text-white rounded-full bg-red-500 absolute top-0 right-0">
              {user?.notifications?.length}
            </span>
          )}
          <Bell size={23} />
          {openNotifications && (
            <NotificationsModal
              isModalOpen={openNotifications}
              setOpenNotifications={setOpenNotifications}
            />
          )}
        </div>
        <div
          onClick={() => setOpenProfile(true)}
          className="h-14 w-14 rounded-full cursor-pointer  flex justify-center items-center "
        >
          <img className="inline-block h-14 w-14 rounded-full" src={user?.avatar} alt="" />
        </div>
        {openProfile && (
          <UserProfileOverlay openProfile={openProfile} setOpenProfile={setOpenProfile} />
        )}
      </div>
    </nav>
  );
};

export default SideNavSM;
