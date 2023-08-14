import { useGlobalContext } from "../contex/store";
import axios from "axios";

export const ToggleNoteStatusModal = () => {
  const {
    setUserNotes,
    noteToModify,
    setNoteToModify,
    emptyNoteToModify,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();

  const onToggleNoteStatusHandler = async () => {
    try {
      await axios
        .put(
          `http://localhost:5000/api/notes/toggle-note-status/${noteToModify.note.id}`
        )
        .then((res) => alert(res.data.message));
    } catch (err: any) {
      alert(err.response.data.error);
    }
    setNoteToModify(emptyNoteToModify);
    setUserNotes([]);
    setModalIsOpen(false);
  };

  return modalIsOpen ? (
    <div className="bg-red-200 p-12">
      <h1>Are you sure you want to {noteToModify.action} this note?</h1>
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      <button onClick={onToggleNoteStatusHandler}>{noteToModify.action}</button>
    </div>
  ) : null;
};
