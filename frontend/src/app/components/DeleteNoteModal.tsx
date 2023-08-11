import { useGlobalContext } from "../contex/store";
import axios from "axios";

export const DeleteNoteModal = () => {
  const {
    setUserNotes,
    noteToModify,
    setNoteToModify,
    emptyNoteToModify,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();

  const onDeleteNoteHandler = async () => {
    try {
      await axios
        .delete(
          `http://localhost:5000/api/notes/delete/${noteToModify.note.id}`
        )
        .then((res) => alert(res.data.message));
    } catch (err: any) {
      alert(err.response.data.error);
    }
    setUserNotes([]);
    setNoteToModify(emptyNoteToModify);
    setModalIsOpen(false);
  };

  return modalIsOpen ? (
    <div className="bg-red-200 p-12">
      <h1>Are you sure you want to delete this note?</h1>
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      <button onClick={onDeleteNoteHandler}>Delete</button>
    </div>
  ) : null;
};
