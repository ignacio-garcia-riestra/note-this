import { useGlobalContext } from "../contex/store";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Note } from "../interfaces/Note";
import axios from "axios";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title must be between 2-26 characters long")
    .max(26, "Title must be between 2-26 characters long")
    .required("Mandatory field"),
  content: yup
    .string()
    .min(2, "Content must be between 2-250 characters long")
    .max(250, "Content must be between 2-250 characters long")
    .required("Mandatory field"),
});

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
          .then((res) => {
            setUserNotes([...userNotes, res.data.data]);
            alert(res.data.message);
          });
      } catch (err: any) {
        alert(err.response.data.message);
      }
    } else {
      try {
        const noteId = noteToCreateOrEdit.id;
        delete noteToCreateOrEdit.id;
        await axios
          .put(
            `http://localhost:5000/api/notes/edit/${noteId}`,
            noteToCreateOrEdit
          )
          .then((res) => {
            alert(res.data.message);
          });
      } catch (err: any) {
        alert(err.response.data.error);
      }
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
        validationSchema={validationSchema}
        onSubmit={onCreateOrEditNoteHandler}
      >
        {({ errors, touched }) => (
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
                className={`h-10 rounded-lg px-2 mb-1 font-inter font-medium text-black focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                  errors.title && touched.title && "border-2 border-red-400"
                }`}
              />
              {errors.title && touched.title ? (
                <>
                  <div className="font-inter font-medium text-sm text-red-500 -mb-8">
                    {errors.title}
                  </div>
                  <div className="self-end -mr-8">
                    <BiErrorCircle className="text-xl text-red-500 -mt-5" />
                  </div>
                </>
              ) : (
                <div className="h-4 mt-1 -mb-8"> </div>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="content"
                className="font-inter font-medium text-lg text-grey-am ml-2 mt-9 mb-1"
              >
                Content
              </label>
              <Field
                id="content"
                name="content"
                type="text"
                as="textarea"
                className={`h-24 rounded-lg px-2 pt-1.5 mb-1 font-inter font-medium text-black content-start focus:outline-none focus:border-2 focus:border-blue-200 focus:shadow-sm focus:shadow-blue-200 ${
                  errors.content && touched.content && "border-2 border-red-400"
                }`}
              />
              {errors.content && touched.content ? (
                <>
                  <div className="font-inter font-medium text-sm text-red-500 -mb-8">
                    {errors.content}
                  </div>
                  <div className="self-end -mr-8">
                    <BiErrorCircle className="text-xl text-red-500 -mt-12" />
                  </div>
                </>
              ) : (
                <div className="h-4 mt-1 -mb-8"> </div>
              )}
            </div>

            <div className="mt-12 flex flex-row w-2/3 self-center justify-between">
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
        )}
      </Formik>
    </div>
  ) : null;
};
