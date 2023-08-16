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
    <div className="bg-slate-200 opacity-100 fixed mx-auto top-32 w-[480px] h-fit px-12 py-6 rounded-xl">
      <h4 className="mb-4 font-semibold text-2xl text-center">
        Are you sure you want to delete this note?
      </h4>
      <div className="mt-4 flex flex-row w-2/3 mx-auto justify-between">
        <button
          className="bg-red-400 text-white font-inter font-bold text-lg
         w-28 h-11 rounded-lg self-center"
          onClick={() => {
            setNoteToModify(emptyNoteToModify);
            setModalIsOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-green-400 text-white font-inter font-bold text-lg
         w-28 h-11 rounded-lg self-center"
          onClick={onDeleteNoteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  ) : null;
};
