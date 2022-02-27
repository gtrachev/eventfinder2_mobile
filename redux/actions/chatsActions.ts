import axios from "axios";
import { Dispatch } from "redux";
import { chatActionWrap } from "../../utils/helpers/actionWrap";
import withCredentials from "../../utils/helpers/withCredentials";
import { chatsActionTypes } from "../../utils/types/actionTypes/chatsActionTypes";
import { userActionTypes } from "../../utils/types/actionTypes/usersActionTypes";
import {
  ChatType,
  MessageInputType,
  MessageType,
  UserType,
} from "../../utils/types/modelTypes";
import { getUser } from "./userActions";

export const getChat = (chat_id: string) => (dispatch: Dispatch) => {
  chatActionWrap(dispatch, async () => {
    const res = await axios.get<{ chat?: ChatType; err_message?: string }>(
      `https://eventfinder2-server.herokuapp.com/api/chats/${chat_id}`,
      withCredentials()
    );
    const chat = res.data.chat;
    if (chat) {
      dispatch({
        type: chatsActionTypes.GET_CHAT,
        payload: chat,
      });
    }
  });
};

export const createChat = (member_id: string) => (dispatch: Dispatch) => {
  chatActionWrap(dispatch, async () => {
    const res = await axios.get<{ newUserChat?: ChatType; message?: string }>(
      `https://eventfinder2-server.herokuapp.com/api/chats/create/${member_id}`,
      withCredentials()
    );
    const newUserChat = res.data.newUserChat;
    if (newUserChat) {
      dispatch({
        type: chatsActionTypes.GET_CHAT,
        payload: newUserChat,
      });
      dispatch({
        type: userActionTypes.USER_JOIN_CHAT,
        payload: { joinedChat: newUserChat },
      });
      if (newUserChat) {
        getUser()(dispatch);
        getChat(newUserChat._id)(dispatch);
      }
    }
  });
};

export const joinEventChat = (event_id: string) => (dispatch: Dispatch) => {
  chatActionWrap(dispatch, async () => {
    const res = await axios.get<{
      joinedChat?: ChatType;
      addedMember?: UserType;
      err_message?: string;
    }>(`https://eventfinder2-server.herokuapp.com/api/chats/join/${event_id}`, withCredentials());
    const { joinedChat, addedMember } = res.data;
    if (joinedChat && addedMember) {
      dispatch({
        type: chatsActionTypes.JOIN_CHAT,
        payload: { addedMember },
      });
      dispatch({
        type: userActionTypes.USER_JOIN_CHAT,
        payload: { joinedChat },
      });
    }
  });
};

export const leaveEventChat = (event_id: string) => (dispatch: Dispatch) => {
  chatActionWrap(dispatch, async () => {
    const res = await axios.get<{
      leftChat?: ChatType;
      removedMember?: UserType;
      err_message?: string;
    }>(`https://eventfinder2-server.herokuapp.com/api/chats/join/${event_id}`, withCredentials());
    const { leftChat, removedMember } = res.data;
    if (leftChat && removedMember) {
      dispatch({
        type: chatsActionTypes.LEAVE_CHAT,
        payload: { removedMember },
      });
      dispatch({
        type: userActionTypes.USER_LEAVE_CHAT,
        payload: { leftChat },
      });
    }
  });
};

export const createMessage =
  (chat_id: string, messageData: MessageInputType) => (dispatch: Dispatch) => {
    chatActionWrap(dispatch, async () => {
      const res = await axios.post<{
        newMessage?: MessageType;
        err_message?: string;
      }>(
        `https://eventfinder2-server.herokuapp.com/api/chats/message/${chat_id}`,
        messageData,
        withCredentials()
      );
      const { newMessage } = res.data;
      if (newMessage) {
        dispatch({
          type: chatsActionTypes.CREATE_MESSAGE,
          payload: { newMessage },
        });
        getChat(chat_id)(dispatch);
      }
    });
  };
