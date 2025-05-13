import React from "react";
import { ContactType } from "../../../types/user.types";
import ContactCard from "./ContactCard";

interface ContactListProps {
  contacts: ContactType[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  let currentAlphabet = "";
  return (
    <>
      {contacts.map((contact: ContactType, index) => {
        const firstAlphabet = contact?.firstName[0].toUpperCase() || "";
        if (firstAlphabet !== currentAlphabet) {
          currentAlphabet = firstAlphabet;
          return (
            <React.Fragment key={index}>
              <h2 className="text-[#709CE6] ml-2">{firstAlphabet}</h2>
              <ContactCard contact={contact} />
            </React.Fragment>
          );
        }
        return <ContactCard key={firstAlphabet} contact={contact} />;
      })}
    </>
  );
};

export default ContactList;
