import { Dispatch } from "redux";
import { setReqFailed, setIsLoading } from "../../redux/actions/helperActions";
import { chatsActionTypes } from "../types/actionTypes/chatsActionTypes";
import { errorActionTypes } from "../types/actionTypes/errorActionTypes";
import { eventActionTypes } from "../types/actionTypes/eventsActionTypes";
import { noteActionTypes } from "../types/actionTypes/notesActionType";
import { userActionTypes } from "../types/actionTypes/usersActionTypes";

export const eventActionWrap = async (dispatch: Dispatch, fn: () => void) => {
  try {
    setIsLoading(true, eventActionTypes.SET_IS_LOADING_EVENTS)(dispatch);
    await fn();
  } catch (err: any) {
    const errorMsg = err.response
      ? err.response.data.err_message
      : "There was an error.";
    setReqFailed(true, eventActionTypes.SET_FAILED_REQ_EVENTS)(dispatch);
    dispatch({
      type: errorActionTypes.SET_ERROR,
      payload: errorMsg,
    });
  }
  setIsLoading(false, eventActionTypes.SET_IS_LOADING_EVENTS)(dispatch);
};

export const userActionWrap = async (dispatch: Dispatch, fn: () => void) => {
  try {
    setIsLoading(true, userActionTypes.SET_IS_LOADING_USERS)(dispatch);
    await fn();
  } catch (err: any) {
    const errorMsg = err.response
      ? err.response.data.err_message
      : "There was an error.";
    setReqFailed(true, userActionTypes.SET_FAILED_REQ_USERS)(dispatch);
    dispatch({
      type: errorActionTypes.SET_ERROR,
      payload: errorMsg,
    });
  }
  setIsLoading(false, userActionTypes.SET_IS_LOADING_USERS)(dispatch);
};

export const noteActionWrap = async (dispatch: Dispatch, fn: () => void) => {
  try {
    setIsLoading(true, noteActionTypes.SET_IS_LOADING_NOTES)(dispatch);
    await fn();
  } catch (err: any) {
    const errorMsg = err.response
      ? err.response.data.err_message
      : "There was an error.";
    setReqFailed(true, noteActionTypes.SET_FAILED_REQ_NOTES)(dispatch);
    dispatch({
      type: errorActionTypes.SET_ERROR,
      payload: errorMsg,
    });
  }
  setIsLoading(false, noteActionTypes.SET_IS_LOADING_NOTES)(dispatch);
};

export const chatActionWrap = async (dispatch: Dispatch, fn: () => void) => {
  try {
    setIsLoading(true, chatsActionTypes.SET_IS_LOADING_CHATS)(dispatch);
    await fn();
  } catch (err: any) {
    const errorMsg = err.response
      ? err.response.data.err_message
      : "There was an error.";
    setReqFailed(true, chatsActionTypes.SET_FAILED_REQ_CHATS)(dispatch);
    dispatch({
      type: errorActionTypes.SET_ERROR,
      payload: errorMsg,
    });
  }
  setIsLoading(false, chatsActionTypes.SET_IS_LOADING_CHATS)(dispatch);
};
