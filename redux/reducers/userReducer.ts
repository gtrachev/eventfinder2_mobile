import { Action } from "../rootReducer";
import { UserType } from "../../utils/types/modelTypes";
import {
  userActionEnum,
  userActionTypes,
} from "../../utils/types/actionTypes/usersActionTypes";
import { usersReducerStateType } from "../../utils/types/reducerStateTypes";

const initState: usersReducerStateType = {
  currentUser: undefined,
  userById: undefined,
  orderId: "",
  recommendedUsers: [],
  userPosts: [],
  userByIdPosts: [],
  isLoggedIn: false,
  isLoading: false,
  reqFailed: false,
};

const userReducer = (
  state = initState,
  action: Action<userActionEnum, any>
) => {
  switch (action.type) {
    case userActionTypes.GET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        userPosts: action.payload.userPosts,
        isLoggedIn: true,
      };
    case userActionTypes.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case userActionTypes.GET_RECOMMENDED_USERS:
      return {
        ...state,
        recommendedUsers: action.payload,
      };
    case userActionTypes.GET_USER_BYID:
      return {
        ...state,
        userById: action.payload.user,
        userByIdPosts: action.payload.userPosts,
      };
    case userActionTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    case userActionTypes.USER_ATTEND:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            attending: [...state.currentUser.attending, action.payload],
          },
        };
      }
      return state;
    case userActionTypes.USER_UNATTEND:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            attending: state.currentUser.attending.filter(
              (event) => event._id === action.payload._id
            ),
          },
        };
      }
      return state;
    case userActionTypes.SAVE_EVENT:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            savedEvents: [...state.currentUser.savedEvents, action.payload],
          },
        };
      }
      return state;
    case userActionTypes.UNSAVE_EVENT:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            savedEvents: state.currentUser.savedEvents.filter(
              (event) => event._id === action.payload._id
            ),
          },
        };
      }
      return state;
    case userActionTypes.LIKE_NOTE:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            likedNotes: [
              ...state.currentUser.likedNotes,
              action.payload.likedNote,
            ],
          },
        };
      }
      return state;
    case userActionTypes.UNLIKE_NOTE:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            likedNotes: state.currentUser.likedNotes.filter(
              (note) => note._id !== action.payload.unlikedNote._id
            ),
          },
        };
      }
      return state;
    case userActionTypes.FOLLOW:
      if (
        (state.currentUser && !state.userById) ||
        (state.currentUser && state.currentUser?._id === state.userById?._id) ||
        (state.currentUser &&
          state.userById &&
          action.payload._id !== state.userById._id)
      ) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            following: [...state.currentUser.following, action.payload],
          },
        };
      } else if (
        state.currentUser &&
        state.userById &&
        state.currentUser._id !== state.userById._id
      ) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            following: [...state.currentUser.following, action.payload],
          },
          userById: {
            ...state.userById,
            followers: [...state.userById.followers, state.currentUser],
          },
        };
      }
      return state;
    case userActionTypes.UNFOLLOW:
      if (
        (state.currentUser && !state.userById) ||
        (state.currentUser && state.currentUser?._id === state.userById?._id)
      ) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            following: state.currentUser.following.filter(
              (followedUser) => followedUser._id !== action.payload._id
            ),
          },
        };
      } else if (
        state.currentUser &&
        state.userById &&
        state.currentUser._id !== state.userById._id
      ) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            following: state.currentUser.following.filter(
              (followedUser) => action.payload._id !== followedUser._id
            ),
          },
          userById: {
            ...state.userById,
            followers: state.userById.followers.filter(
              (followerUser) => followerUser._id !== state.currentUser!._id
            ),
          },
        };
      }
      return state;
    case userActionTypes.USER_JOIN_CHAT:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            inChats: [...state.currentUser.inChats, action.payload.joinedChat],
          },
        };
      }
      return state;
    case userActionTypes.USER_LEAVE_CHAT:
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            inChats: state.currentUser.inChats.filter(
              (chat) => chat._id === action.payload.leftChat._id
            ),
          },
        };
      }
      return state;
    case userActionTypes.SET_IS_LOADING_USERS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case userActionTypes.SET_FAILED_REQ_USERS:
      return {
        ...state,
        failedReq: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
