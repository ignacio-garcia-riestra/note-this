import { useGlobalContext } from "../contex/store";
import { Field, Form, Formik } from "formik";
import { Note } from "../interfaces/Note";
import axios from "axios";
import { useState } from "react";

export const CreateOrEditNoteModal = () => {
  const {
    userNotes,
    setUserNotes,
    noteToModify,
    setNoteToModify,
    emptyNoteToModify,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();
  const userIdInitialValue = sessionStorage.getItem("userId");
  const [userId] = useState(userIdInitialValue);

  const onCreateOrEditNoteHandler = async (noteToCreateOrEdit: Note) => {
    if (!noteToCreateOrEdit.id) {
      try {
        delete noteToCreateOrEdit.id;
        await axios
          .post(
            `http://localhost:5000/api/notes/new/${userId}`,
            noteToCreateOrEdit
          )
          .then(res => {
            setUserNotes([...userNotes, res.data.data]);
            alert(res.data.message);
          });
      } catch (err: any) {
        alert(err.response.data.error);
      };
    } else {
      try {
        const noteId = noteToCreateOrEdit.id;
        delete noteToCreateOrEdit.id;
        await axios
          .put(
            `http://localhost:5000/api/notes/edit/${noteId}`,
            noteToCreateOrEdit
          )
          .then(res => {
            alert(res.data.message);
          });
      } catch (err: any) {
        alert(err.response.data.error);
      };
      setUserNotes([]);
    }
    setNoteToModify(emptyNoteToModify);
    setModalIsOpen(false);
  };

  return modalIsOpen ? (
    <div className="bg-slate-200 opacity-100 fixed mx-auto top-32 w-[480px] h-fit px-12 py-6 rounded-xl">
      <h4 className="mb-4 font-semibold text-2xl text-center">
        {`${noteToModify.note.id ? "Edit your note" : "Create new note"}`}
      </h4>
      <Formik
        initialValues={noteToModify.note}
        onSubmit={onCreateOrEditNoteHandler}
      >
        <Form className="flex flex-col">
          <div className="flex flex-col w-full">
            <label
              htmlFor="title"
              className="font-inter font-medium text-lg text-grey-am ml-2 my-1"
            >
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className="h-10 rounded-lg px-2 mb-4 font-inter font-medium text-black"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="content"
              className="font-inter font-medium text-lg text-grey-am ml-2 my-1"
            >
              Content
            </label>
            <Field
              id="content"
              name="content"
              type="text"
              as="textarea"
              className="h-24 rounded-lg px-2 pt-1.5 mb-4 font-inter font-medium text-black content-start"
            />
          </div>

          <div className="mt-4 flex flex-row w-2/3 self-center justify-between">
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
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  ) : null;
};
