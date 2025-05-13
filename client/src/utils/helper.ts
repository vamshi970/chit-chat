export const sortContacts = (contacts: any) => {
  if (contacts === undefined) return [];

  const sortedContacts = contacts.sort((a: any, b: any) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });

  return sortedContacts;
};

export const isObjectEmpty = (objectName: any) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};
