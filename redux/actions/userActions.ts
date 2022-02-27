import axios from "axios";
import { Dispatch } from "redux";
import { userActionWrap } from "../../utils/helpers/actionWrap";
import withCredentials from "../../utils/helpers/withCredentials";
import { eventActionTypes } from "../../utils/types/actionTypes/eventsActionTypes";
import { noteActionTypes } from "../../utils/types/actionTypes/notesActionType";
import { userActionTypes } from "../../utils/types/actionTypes/usersActionTypes";
import {
  EditUserInputType,
  EventType,
  NoteType,
  UserInputType,
  UserType,
} from "../../utils/types/modelTypes";
import { getDetails } from "./eventsActions";
import { getFollowedPosts } from "./postsActions";

export const getUser = (orderId?: string) => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      user?: UserType;
      userPosts?: any;
      message?: string;
      err_message?: string;
    }>(
      "https://eventfinder2-server.herokuapp.com/api/user/current",
      withCredentials()
    );
    const currentUser = res.data.user;
    const { userPosts } = res.data;
    dispatch({
      type: userActionTypes.GET_USER,
      payload: { currentUser, userPosts },
    });
    if (orderId) {
      dispatch({
        type: userActionTypes.SET_ORDER_ID,
        payload: orderId,
      });
    }
  });
};

export const getRecommendedUsers = () => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      recommendedUsers?: UserType[];
      message?: string;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/user/recommended`,
      withCredentials()
    );
    const recommendedUsers = res.data.recommendedUsers;
    dispatch({
      type: userActionTypes.GET_RECOMMENDED_USERS,
      payload: recommendedUsers,
    });
  });
};
export const getUserById = (user_id: string) => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      user?: UserType;
      userPosts?: any;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/user/by_id/${user_id}`,
      withCredentials()
    );
    dispatch({
      type: userActionTypes.GET_USER_BYID,
      payload: {
        user: res.data.user,
        userPosts: res.data.userPosts,
      },
    });
  });
};

export const loginUser =
  (userData: { username: string; password: string }) =>
  (dispatch: Dispatch) => {
    userActionWrap(dispatch, async () => {
      await axios.post<{ user: UserType; err_message?: string }>(
        "https://eventfinder2-server.herokuapp.com/api/user/login",
        userData,
        withCredentials()
      );
      const res = await axios.get<{
        user?: UserType;
        userPosts?: any;
        likedNotes?: NoteType[];
        message?: string;
        err_message?: string;
      }>(
        "https://eventfinder2-server.herokuapp.com/api/user/current",
        withCredentials()
      );
      const currentUser = res.data.user;
      const { userPosts, likedNotes } = res.data;
      dispatch({
        type: userActionTypes.GET_USER,
        payload: { currentUser, userPosts, likedNotes },
      });
    });
  };

export const registerUser =
  (userData: UserInputType) => (dispatch: Dispatch) => {
    userActionWrap(dispatch, async () => {
      const res = await axios.post<{
        user?: UserType;
        orderId?: string;
        err_message?: string;
      }>(
        "https://eventfinder2-server.herokuapp.com/api/user/register",
        userData,
        withCredentials()
      );
      const user = res.data.user;
      if (user) {
        getUser()(dispatch);
      }
    });
  };

export const editUser =
  (editUserData: EditUserInputType) => (dispatch: Dispatch) => {
    userActionWrap(dispatch, async () => {
      const res = await axios.put<{
        editedUser?: UserType;
        err_message?: string;
      }>(
        "https://eventfinder2-server.herokuapp.com/api/user/edit",
        editUserData,
        withCredentials()
      );
      const editedUser = res.data.editedUser;
      if (editedUser) {
        dispatch({
          type: userActionTypes.GET_USER,
          payload: editedUser,
        });
        return;
      }
    });
  };

export const logoutUser = () => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    await axios.get<{ message?: string; err_message?: string }>(
      "https://eventfinder2-server.herokuapp.com/api/user/logout",
      withCredentials()
    );
    dispatch({
      type: userActionTypes.LOGOUT_USER,
    });
    getUser()(dispatch);
  });
};

export const handleAttend = (event_id: string) => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      removedEvent?: string;
      addedEvent?: EventType;
      user?: UserType;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/events/attend/${event_id}`,
      withCredentials()
    );
    if (res.data.addedEvent) {
      dispatch({
        type: userActionTypes.USER_ATTEND,
        payload: res.data.addedEvent,
      });
      dispatch({ type: eventActionTypes.ATTEND, payload: res.data.user });
      getUser()(dispatch);
      getDetails(event_id)(dispatch);
    } else if (res.data.removedEvent) {
      dispatch({
        type: userActionTypes.USER_UNATTEND,
        payload: res.data.removedEvent,
      });
      dispatch({ type: eventActionTypes.UNATTEND, payload: res.data.user });
      getUser()(dispatch);
      getDetails(event_id)(dispatch);
    }
  });
};

export const handleSave = (event_id: string) => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      unsavedEvent?: string;
      savedEvent?: EventType;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/events/save/${event_id}`,
      withCredentials()
    );
    if (res.data.savedEvent) {
      dispatch({
        type: userActionTypes.SAVE_EVENT,
        payload: res.data.savedEvent,
      });
      getUser()(dispatch);
    } else if (res.data.unsavedEvent) {
      dispatch({
        type: userActionTypes.UNSAVE_EVENT,
        payload: res.data.unsavedEvent,
      });
      getUser()(dispatch);
    }
  });
};

export const handleFollow = (account_id: string) => (dispatch: Dispatch) => {
  userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      message?: string;
      followedUser?: UserType;
      unfollowedUser?: UserType;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/user/follow/${account_id}`,
      withCredentials()
    );
    if (res.data.followedUser) {
      dispatch({
        type: userActionTypes.FOLLOW,
        payload: res.data.followedUser,
      });
      getFollowedPosts(30)(dispatch);
    } else if (res.data.unfollowedUser) {
      dispatch({
        type: userActionTypes.UNFOLLOW,
        payload: res.data.unfollowedUser,
      });
      getFollowedPosts(30)(dispatch);
    }
  });
};

export const handleUserLikeNote = (note_id: string) => (dispatch: Dispatch) => {
  return userActionWrap(dispatch, async () => {
    const res = await axios.get<{
      message?: string;
      likedBy?: UserType;
      likedNote?: NoteType;
      unlikedBy?: UserType;
      unlikedNote?: NoteType;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/notes/like/${note_id}`,
      withCredentials()
    );
    if (res.data.likedBy) {
      dispatch({
        type: userActionTypes.LIKE_NOTE,
        payload: {
          likedBy: res.data.likedBy,
          likedNote: res.data.likedNote,
        },
      });
      dispatch({
        type: noteActionTypes.LIKE,
        payload: {
          note_id,
          likedBy: res.data.likedBy,
          likedNote: res.data.likedNote,
        },
      });
      getUser()(dispatch);
    } else if (res.data.unlikedBy) {
      dispatch({
        type: userActionTypes.UNLIKE_NOTE,
        payload: {
          unlikedBy: res.data.unlikedBy,
          unlikedNote: res.data.unlikedNote,
        },
      });
      dispatch({
        type: noteActionTypes.UNLIKE,
        payload: {
          note_id,
          unlikedBy: res.data.unlikedBy,
          unlikedNote: res.data.unlikedNote,
        },
      });
      getUser()(dispatch);
    }
  });
};
