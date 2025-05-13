import { useState } from "react";
import { DashboardType, DashboardEnum } from "../types/chat.types";
import SideNavSM from "../layout/SideNavSM";
import SideNavLG from "../layout/SideNavLG";
import Chat from "./chat/Chat";

const Home = () => {
  const [currentTab, setCurrentTab] = useState<DashboardType>(
    DashboardEnum.Conversations
  );
  return (
    <section className="flex w-full">
      <SideNavSM currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <SideNavLG currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Chat />
    </section>
  );
};

export default Home;
