import {
  postActionEnums,
  postActionTypes,
} from "../../utils/types/actionTypes/postsActionTypes";
import { postsReducerStateType } from "../../utils/types/reducerStateTypes";
import { Action } from "../rootReducer";

const initialState: postsReducerStateType = {
  followedPosts: [],
  isLoading: false,
  reqFailed: false,
};

const postsReducer = (
  state = initialState,
  action: Action<postActionEnums, any>
) => {
  switch (action.type) {
    case postActionTypes.GET_FOLLOWED_POSTS:
      return {
        ...state,
        followedPosts: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
