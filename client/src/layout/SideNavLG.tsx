import { DashboardType, DashboardEnum } from "../types/chat.types";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Conversations from "../components/dashboard/Conversations";
import Groups from "../components/groups/Groups";
import Contacts from "../components/dashboard/Contacts";

type SideNavLGProps = {
  currentTab: DashboardType;
  setCurrentTab: React.Dispatch<React.SetStateAction<DashboardType>>;
};

const SideNavLG = ({ currentTab, setCurrentTab }: SideNavLGProps) => {
  return (
    <nav className="bg-[#F8FAFF] px-6 py-6  max-h-screen overflow-auto max-md:hidden">
      <DashboardHeader setCurrentTab={setCurrentTab} currentTab={currentTab} />

      {currentTab === DashboardEnum.Conversations && <Conversations />}
      {currentTab === DashboardEnum.Groups && <Groups />}
      {currentTab === DashboardEnum.Contacts && <Contacts />}
      {currentTab === DashboardEnum.Archived && (
        <Conversations archived={currentTab === DashboardEnum.Archived} />
      )}
    </nav>
  );
};

export default SideNavLG;
