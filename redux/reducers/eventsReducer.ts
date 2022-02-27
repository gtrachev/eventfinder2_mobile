import {
  eventActionEnum,
  eventActionTypes,
} from "../../utils/types/actionTypes/eventsActionTypes";
import { eventsReducerStateType } from "../../utils/types/reducerStateTypes";
import { Action } from "../rootReducer";

const initState: eventsReducerStateType = {
  events: [],
  eventDetails: undefined,
  isLoading: false,
  reqFailed: false,
};

const eventReducer = (
  state = initState,
  action: Action<eventActionEnum, any>
) => {
  switch (action.type) {
    case eventActionTypes.GET_EVENTS:
      return {
        ...state,
        events: [...action.payload],
      };
    case eventActionTypes.GET_DETAILS:
      return {
        ...state,
        eventDetails: action.payload,
      };
    case eventActionTypes.CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        eventDetails: action.payload,
      };
    case eventActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event) => action.payload._id !== event._id
        ),
        eventDetails: undefined,
      };
    case eventActionTypes.EDIT_EVENT:
      const edittedEventIndex = state.events.findIndex((event) =>
        action.payload._id.equals(event._id)
      );
      const updatedEvents = [...state.events];
      updatedEvents[edittedEventIndex] = action.payload;
      return {
        ...state,
        events: updatedEvents,
        eventDetails: action.payload,
      };
    case eventActionTypes.CREATE_REVIEW:
      return {
        ...state,
        eventDetails: {
          ...state.eventDetails,
          reviews: state.eventDetails!.reviews.length
            ? [...state.eventDetails!.reviews, action.payload]
            : [action.payload],
        },
      };
      return state;
    case eventActionTypes.DELETE_REVIEW:
      if (state.eventDetails) {
        return {
          ...state,
          eventDetails: {
            ...state.eventDetails,
            reviews: state.eventDetails.reviews.filter(
              (review) => review._id !== action.payload._id
            ),
          },
        };
      }
      return state;
    case eventActionTypes.ATTEND:
      if (state.eventDetails) {
        return {
          ...state,
          eventDetails: {
            ...state.eventDetails,
            attenders: state.eventDetails.attenders.length
              ? [...state.eventDetails.attenders, action.payload]
              : [action.payload],
          },
        };
      }
      return state;
    case eventActionTypes.UNATTEND:
      if (state.eventDetails) {
        return {
          ...state,
          eventDetails: {
            ...state.eventDetails,
            attenders: state.eventDetails.attenders.filter(
              (user) => user._id === action.payload._id
            ),
          },
        };
      }
      return state;
    case eventActionTypes.SET_IS_LOADING_EVENTS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case eventActionTypes.SET_FAILED_REQ_EVENTS:
      return {
        ...state,
        failedReq: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
