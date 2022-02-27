import {
  noteActionEnum,
  noteActionTypes,
} from "../../utils/types/actionTypes/notesActionType";
import { notesInitialStateType } from "../../utils/types/reducerStateTypes";
import { Action } from "../rootReducer";

const initialState: notesInitialStateType = {
  notes: [],
  notesDetails: undefined,
  isLoading: false,
  reqFailed: false,
};

const notesReducer = (
  state = initialState,
  action: Action<noteActionEnum, any>
) => {
  switch (action.type) {
    case noteActionTypes.CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        noteDetails: action.payload,
      };
    case noteActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => action.payload._id !== note._id),
        noteDetails: {},
      };
    case noteActionTypes.LIKE:
      const likedIndex = state.notes.findIndex((note) =>
        action.payload.note_id.equals(note._id)
      );
      const updatedNotesLike = [...state.notes];
      updatedNotesLike[likedIndex].likedBy = [
        ...updatedNotesLike[likedIndex].likedBy,
        action.payload.likedBy,
      ];
      return {
        ...state,
        notes: updatedNotesLike,
      };

    case noteActionTypes.UNLIKE:
      const unlikedIndex = state.notes.findIndex((note) =>
        action.payload.note_id.equals(note._id)
      );
      const updatedNotesUnlike = [...state.notes];
      updatedNotesUnlike[unlikedIndex].likedBy = updatedNotesUnlike[
        unlikedIndex
      ].likedBy.filter((user) => user._id !== action.payload.unlikedBy._id);
      return {
        ...state,
        notes: updatedNotesUnlike,
      };
    default:
      return state;
  }
};

export default notesReducer;
