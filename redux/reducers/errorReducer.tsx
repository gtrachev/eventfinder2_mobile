import {
  errorActionEnum,
  errorActionTypes,
} from "../../utils/types/actionTypes/errorActionTypes";
import { Action } from "../rootReducer";

const initialState = {
  error: "",
};

const errorReducer = (
  state = initialState,
  action: Action<errorActionEnum, any>
) => {
  switch (action.type) {
    case errorActionTypes.SET_ERROR:
      return { error: action.payload };
    default:
      return state;
  }
};

export default errorReducer;
