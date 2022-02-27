import axios from "axios";
import { Dispatch } from "redux";
import { errorActionTypes } from "../../utils/types/actionTypes/errorActionTypes";
import { postActionTypes } from "../../utils/types/actionTypes/postsActionTypes";
import { EventType, NoteType } from "../../utils/types/modelTypes";
import { setIsLoading, setReqFailed } from "./helperActions";
import withCredentials from "../../utils/helpers/withCredentials";

export const getFollowedPosts =
  (fromDays: number) => async (dispatch: Dispatch) => {
    try {
      setIsLoading(true, postActionTypes.SET_IS_LOADING_POSTS)(dispatch);
      const res = await axios.get<{
        message?: string;
        followingPosts?: [EventType, NoteType];
      }>(
        `https://eventfinder2-server.herokuapp.com/api/posts/following/${fromDays}`,
        withCredentials()
      );
      const followingPosts = res.data.followingPosts;
      if (followingPosts) {
        dispatch({
          type: postActionTypes.GET_FOLLOWED_POSTS,
          payload: followingPosts,
        });
      }
    } catch (err: any) {
      const errorMsg = err.response
        ? err.response.data.err_message
        : "There was an error.";
      setReqFailed(true, postActionTypes.SET_FAILED_REQ_POSTS)(dispatch);
      dispatch({
        type: errorActionTypes.SET_ERROR,
        payload: errorMsg,
      });
    }
    setIsLoading(false, postActionTypes.SET_IS_LOADING_POSTS)(dispatch);
  };
