import { useMemo } from "react";
import { sortContacts } from "../../utils/helper";
import ContactList from "../ui/dashboard/ContactList";
import DashboardLoader from "../ui/loaders/DashboardLoader";
import { useContactsQuery } from "../../hooks/chat";

const Contacts = () => {
  const { data, isLoading, isSuccess, isError } = useContactsQuery();

  const contacts = useMemo(() => sortContacts(data), [data]);

  if (isLoading) return <DashboardLoader />;

  if (isError) return <div>Error</div>;

  if (isSuccess)
    return (
      <div>
        <ContactList contacts={contacts} />
      </div>
    );
};

export default Contacts;
