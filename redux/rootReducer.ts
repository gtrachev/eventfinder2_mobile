import { combineReducers } from "redux";
import chatsReducer from "./reducers/chatsReducer";
import errorReducer from "./reducers/errorReducer";
import eventReducer from "./reducers/eventsReducer";
import notesReducer from "./reducers/notesReducer";
import postsReducer from "./reducers/postsReducer";
import uiReducer from "./reducers/uiReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  postsReducer: postsReducer,
  events: eventReducer,
  users: userReducer,
  notesReducer: notesReducer,
  ui: uiReducer,
  errors: errorReducer,
  chats: chatsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

export default rootReducer;
