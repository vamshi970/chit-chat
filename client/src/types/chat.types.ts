import { ContactType } from "./user.types";

export type DashboardType = DashboardEnum;

export type MemberType = Omit<ContactType, "about">;

export type CurrentChatType = MemberType & {
  chatId: string;
};

export type ConversationType = {
  _id: string;
  isArchived: boolean;
  members: MemberType[];
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
};

export type GroupType = {
  name: string;
  content: string;
  src: string;
};

export enum DashboardEnum {
  Conversations = "Conversations",
  Groups = "Groups",
  Contacts = "Contacts",
  Archived = "Archived",
}

export type MessageType = {
  _id: string;
  chat: string;
  sender: string;
  message: string;
  status: MessageStatus;
};

export enum MessageStatus {
  Sent = "sent",
  Delivered = "delivered",
  Read = "read",
  Optimistic = "optimistic",
}
