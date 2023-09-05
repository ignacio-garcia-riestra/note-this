import { useGlobalContext } from "../contex/store";

export const ShowNoteModal = () => {
  const {
    noteToModify,
    setNoteToModify,
    emptyNoteToModify,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();

  return modalIsOpen ? (
    <div className="bg-green-200 opacity-100 fixed mx-auto top-32 w-[480px] h-fit px-12 py-6 rounded-xl flex flex-col">
      <h4 className="mb-4 font-semibold text-2xl text-center">
        {noteToModify.note.title}
      </h4>
      <div className="bg-yellow-100 text-xl p-2 min-h-[148px] rounded-lg">
        {noteToModify.note.content}
      </div>

      <div className="mt-12 flex flex-row w-2/3 self-center justify-between">
        <button
          className="bg-slate-400 text-white font-inter font-bold text-lg
                w-28 h-11 rounded-lg self-center"
          onClick={() => {
            setNoteToModify(emptyNoteToModify);
            setModalIsOpen(false);
          }}
        >
          Close
        </button>
        <button
          className="bg-blue-400 text-white font-inter font-bold text-lg
                w-28 h-11 rounded-lg self-center"
          onClick={() => {
            setNoteToModify({ note: noteToModify.note, action: "edit" });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  ) : null;
};
