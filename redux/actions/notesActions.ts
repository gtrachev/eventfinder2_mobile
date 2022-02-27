import axios from "axios";
import { Dispatch } from "redux";
import { noteActionWrap } from "../../utils/helpers/actionWrap";
import withCredentials from "../../utils/helpers/withCredentials";
import { noteActionTypes } from "../../utils/types/actionTypes/notesActionType";
import { NoteInputType, NoteType } from "../../utils/types/modelTypes";
import { getUser } from "./userActions";

export const createNote = (noteData: NoteInputType) => (dispatch: Dispatch) => {
  return noteActionWrap(dispatch, async () => {
    const res = await axios.post<{ note?: NoteType; err_message?: string }>(
      "https://eventfinder2-server.herokuapp.com/api/notes/create",
      noteData,
      withCredentials()
    );
    const newNote = res.data.note;
    dispatch({
      type: noteActionTypes.CREATE_NOTE,
      payload: newNote,
    });
  });
};

export const deleteNote = (note_id: string) => (dispatch: Dispatch) => {
  return noteActionWrap(dispatch, async () => {
    const res = await axios.delete<{
      deletedNote?: NoteType;
      message?: string;
      err_message?: string;
    }>(`https://eventfinder2-server.herokuapp.com/api/notes/delete/${note_id}`, withCredentials());
    const deletedNote = res.data.deletedNote;
    if (deletedNote) {
      dispatch({
        type: noteActionTypes.DELETE_NOTE,
        payload: deletedNote,
      });
    }
  });
};
