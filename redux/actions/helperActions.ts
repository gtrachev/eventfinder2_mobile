import { Dispatch } from "redux";

export const setIsLoading =
  (isLoading: boolean, type: string) => (dispatch: Dispatch) => {
    dispatch({
      type: type,
      payload: isLoading,
    });
  };

export const setReqFailed =
  (failedReq: boolean, type: string) => (dispatch: Dispatch) => {
    dispatch({
      type: type,
      payload: failedReq,
    });
  };
