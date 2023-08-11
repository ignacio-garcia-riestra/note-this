import { useGlobalContext } from "../contex/store";
import { Field, Form, Formik } from "formik";
import { Note } from "../interfaces/Note";
import axios from "axios";

export const CreateOrEditNoteModal = (initialNoteData: Note) => {
  const { loggedUserId, modalIsOpen, setModalIsOpen } = useGlobalContext();

  const onCreateOrEditNoteHandler = async (noteToCreateOrEdit: Note) => {
    if (!noteToCreateOrEdit.id) {
      try {
        delete noteToCreateOrEdit.id;
        await axios
          .post(
            `http://localhost:5000/api/notes/new/${loggedUserId}`,
            noteToCreateOrEdit
          )
          .then(res => alert(res.data.message));
      } catch (err: any) {
        alert(err.response.data.error);
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
          .then(res => alert(res.data.message));
      } catch (err: any) {
        alert(err.response.data.error);
      }
    }
    setModalIsOpen(false)
  };

  return modalIsOpen ? (
    <div className="bg-red-200 p-12">
      <h1></h1>
      <Formik
        initialValues={initialNoteData}
        onSubmit={onCreateOrEditNoteHandler}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text"></Field>
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Field id="content" name="content" type="textarea"></Field>
          </div>

          <div>
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </Form>
      </Formik>
    </div>
  ) : null;
};
