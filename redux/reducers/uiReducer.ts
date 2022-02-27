import {
  uiActionsEnum,
  uiActionTypes,
} from "../../utils/types/actionTypes/uiActionTypes";
import { UiInitStateType } from "../../utils/types/reducerStateTypes";
import { Action } from "../rootReducer";

const initialState: UiInitStateType = {
  showOverlay: { show: false, mobile: false },
  showMobileMenu: false,
  showAuthForm: { show: false, authType: "login" },
  flash: { type: "", message: "" },
  showCategories: {
    show: false,
    sellingGroup: "",
  },
  accountListIndex: 0,
  showFollowers: {
    type: "",
    show: false,
  },
  sharedEvent: undefined,
};

const uiReducer = (
  state = initialState,
  action: Action<uiActionsEnum, any>
) => {
  switch (action.type) {
    case uiActionTypes.SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: {
          show: action.payload.show,
          mobile: action.payload.mobile,
        },
      };
    case uiActionTypes.SHOW_MOBILE_MENU:
      return { ...state, showMobileMenu: action.payload };
    case uiActionTypes.SHOW_AUTH_FORM:
      return {
        ...state,
        showAuthForm: {
          show: action.payload.show,
          authType: action.payload.authType,
        },
      };
    case uiActionTypes.SHOW_CATEGORIES:
      return {
        ...state,
        showCategories: {
          show: action.payload.show,
          sellingGroup: action.payload.sellingGroup,
        },
      };
    case uiActionTypes.SET_ACCOUNT_LIST_INDEX:
      return {
        ...state,
        accountListIndex: action.payload,
      };
    case uiActionTypes.SHOW_FOLLOWERS: {
      return {
        ...state,
        showFollowers: action.payload,
      };
    }
    case uiActionTypes.SET_FLASH:
      return {
        ...state,
        flash: action.payload,
      };
    case uiActionTypes.REMOVE_FLASH:
      return {
        ...state,
        flash: { type: "", message: "" },
      };
    case uiActionTypes.SET_SHARED_EVENT:
      return {
        ...state,
        sharedEvent: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
