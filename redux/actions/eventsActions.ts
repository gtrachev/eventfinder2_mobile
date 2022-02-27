import axios from "axios";
import { Dispatch } from "redux";
import { eventActionWrap } from "../../utils/helpers/actionWrap";
import withCredentials from "../../utils/helpers/withCredentials";
import { eventActionTypes } from "../../utils/types/actionTypes/eventsActionTypes";
import {
  EventInputType,
  EventType,
  ReviewInputType,
  ReviewType,
} from "../../utils/types/modelTypes";
import { getUser } from "./userActions";

export const getEvents = (fetchURL: string) => (dispatch: Dispatch) => {
  eventActionWrap(dispatch, async () => {
    const res = await axios.get<{ events: EventType[]; err_message?: string }>(
      fetchURL,
      withCredentials()
    );
    const events = res.data.events;
    if (events) {
      dispatch({
        type: eventActionTypes.GET_EVENTS,
        payload: events,
      });
    }
  });
};

export const getDetails = (event_id: string) => (dispatch: Dispatch) => {
  eventActionWrap(dispatch, async () => {
    const res = await axios.get<{
      event?: EventType;
      message?: string;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/events/details/${event_id}`,
      withCredentials()
    );
    const event = res.data.event;
    if (event) {
      dispatch({
        type: eventActionTypes.GET_DETAILS,
        payload: event,
      });
    }
  });
};

export const createEvent =
  (eventData: EventInputType) => (dispatch: Dispatch) => {
    eventActionWrap(dispatch, async () => {
      const res = await axios.post<{
        newEvent?: EventType;
        err_message?: string;
      }>(
        "https://eventfinder2-server.herokuapp.com/api/events/create",
        eventData,
        withCredentials()
      );
      const newEvent = res.data.newEvent;
      if (newEvent) {
        dispatch({
          type: eventActionTypes.CREATE_EVENT,
          payload: newEvent,
        });
        getEvents(
          "https://eventfinder2-server.herokuapp.com/api/events/popular_events"
        )(dispatch);
        getUser()(dispatch);
      }
    });
  };

export const editEvent =
  (event_id: string, eventData: EventInputType, deletedImages?: string[]) =>
  (dispatch: Dispatch) => {
    eventActionWrap(dispatch, async () => {
      const res = await axios.put<{
        editedEvent?: EventType;
        message?: string;
        err_message?: string;
      }>(
        `https://eventfinder2-server.herokuapp.com/api/events/edit/${event_id}`,
        { eventData, deletedImages },
        withCredentials()
      );
      const edittedEvent = res.data.editedEvent;
      if (edittedEvent) {
        dispatch({
          type: eventActionTypes.EDIT_EVENT,
          payload: edittedEvent,
        });
      }
    });
  };

export const deleteEvent = (event_id: string) => (dispatch: Dispatch) => {
  eventActionWrap(dispatch, async () => {
    const res = await axios.delete<{
      deletedEvent?: EventType;
      message?: string;
      err_message?: string;
    }>(
      `https://eventfinder2-server.herokuapp.com/api/events/delete/${event_id}`,
      withCredentials()
    );
    if (res.data.deletedEvent) {
      dispatch({
        type: eventActionTypes.DELETE_EVENT,
        payload: res.data.deletedEvent,
      });
    }
  });
};

export const createReview =
  (reviewData: ReviewInputType, event_id: string) => (dispatch: Dispatch) => {
    eventActionWrap(dispatch, async () => {
      const res = await axios.post<{
        newReview?: ReviewType;
        message?: string;
        err_message?: string;
      }>(
        `https://eventfinder2-server.herokuapp.com/api/reviews/create/${event_id}`,
        reviewData,
        withCredentials()
      );
      const newReview = res.data.newReview;
      if (newReview) {
        dispatch({
          type: eventActionTypes.CREATE_EVENT,
          payload: newReview,
        });
        getDetails(event_id)(dispatch);
      }
    });
  };

export const deleteReview =
  (review_id: string, event_id: string) => (dispatch: Dispatch) => {
    eventActionWrap(dispatch, async () => {
      const res = await axios.delete<{
        deletedReview?: string;
        message?: string;
        err_message?: string;
      }>(
        `https://eventfinder2-server.herokuapp.com/api/reviews/delete/${review_id}`,
        withCredentials()
      );
      const deleted_id = res.data.deletedReview;
      if (deleted_id) {
        dispatch({
          type: eventActionTypes.DELETE_EVENT,
          payload: deleted_id,
        });
      }
    });
  };
