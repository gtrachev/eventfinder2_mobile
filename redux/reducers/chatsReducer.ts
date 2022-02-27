import { noteActionEnum } from "../../utils/types/actionTypes/notesActionType";
import { chatsInitialStateType } from "../../utils/types/reducerStateTypes";
import { Action } from "../rootReducer";
import { chatsActionTypes } from "../../utils/types/actionTypes/chatsActionTypes";

const initialState: chatsInitialStateType = {
  openedChat: undefined,
  isLoading: false,
  reqFailed: false,
};

const chatsReducer = (
  state = initialState,
  action: Action<noteActionEnum, any>
) => {
  switch (action.type) {
    case chatsActionTypes.GET_CHAT:
      return {
        ...state,
        openedChat: action.payload,
      };
    case chatsActionTypes.JOIN_CHAT:
      if (state.openedChat) {
        return {
          ...state,
          openedChat: {
            ...state.openedChat,
            members: [...state.openedChat.members, action.payload.addedMember],
          },
        };
      }
      return state;
    case chatsActionTypes.LEAVE_CHAT:
      if (state.openedChat) {
        return {
          ...state,
          openedChat: undefined,
        };
      }
      return state;
    case chatsActionTypes.GET_CHAT_MESSAGES:
      return {
        ...state,
        openedChat: {
          ...state.openedChat,
          messages: action.payload,
        },
      };
    case chatsActionTypes.CREATE_MESSAGE:
      if (state.openedChat) {
        return {
          ...state,
          openedChat: {
            ...state.openedChat,
            messages: [...state.openedChat.messages, action.payload],
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default chatsReducer;
