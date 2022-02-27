import flashMessageType from "./flashMessageType";
import { ChatType, EventType, NoteType, UserType } from "./modelTypes";

export interface postsReducerStateType {
  followedPosts: [EventType, NoteType] | [];
  isLoading: boolean;
  reqFailed: boolean;
}

export interface eventsReducerStateType {
  events: EventType[] | [];
  eventDetails: EventType | undefined;
  isLoading: boolean;
  reqFailed: boolean;
}

export interface usersReducerStateType {
  currentUser: UserType | undefined;
  orderId: string;
  recommendedUsers: UserType[] | [];
  userById: UserType | undefined;
  userPosts: any;
  userByIdPosts: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  reqFailed: boolean;
}

export interface notesInitialStateType {
  notes: NoteType[] | [];
  notesDetails: NoteType | undefined;
  isLoading: boolean;
  reqFailed: boolean;
}

export interface chatsInitialStateType {
  openedChat: ChatType | undefined;
  isLoading: boolean;
  reqFailed: boolean;
}

export interface UiInitStateType {
  showOverlay: {
    show: boolean;
    mobile: boolean;
  };
  showMobileMenu: boolean;
  showAuthForm: {
    show: boolean;
    authType: "login" | "register";
  };
  showCategories: {
    show: boolean;
    sellingGroup: string;
  };
  flash: flashMessageType;
  accountListIndex: number;
  showFollowers: {
    type: string;
    show: boolean;
  };
  sharedEvent: EventType | undefined;
}
