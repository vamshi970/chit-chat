/**
 * @Paths
 */

export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const VERIFY_OTP_ROUTE = "/verify-otp";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password/:resetToken";
export const RESET_PASSWORD_EMAIL_SENT_ROUTE = "/forgot-password/sent";
export const NOT_FOUND_ROUTE = "/*";



/**
 * @Utility
 */

export const NUMBER_OF_OTP_DIGITS = 4;


/**
 * @Input
 */

export const fileInput =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/csv";




/**
 * @TestData
 */

export const groups = [
  {
    name: "Avengers",
    content: "Hey there!",
    src: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Sophomores",
    content: "It's so quiet outside",
    src: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Team Matrix",
    content: "How are you?",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    name: "Hackathon",
    content: "It's so quiet outside",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];



export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ONLINE = "online",


  TYPING = "typing",
  START_TYPING = "start typing",
  STOP_TYPING = "stop typing",

  
  FRIEND_REQUEST = "friend request",
  ACCEPT_REQUEST = "accept request",


  CHAT_MESSAGE = "chat message",

  
  JOIN = "join",
  LEAVE = "leave",
  ERROR = "error",
}

