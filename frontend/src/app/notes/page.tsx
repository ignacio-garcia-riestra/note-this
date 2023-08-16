"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "../globals.css";
import { Note } from "../interfaces/Note";
import { MdArchive, MdUnarchive, MdEdit } from "react-icons/md";
import { FaTrashCan, FaNoteSticky } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/contex/store";
import { CreateOrEditNoteModal } from "../components/CreateOrEditNoteModal";
import { DeleteNoteModal } from "../components/DeleteNoteModal";
import { ToggleNoteStatusModal } from "../components/ToggleNoteStatusModal";

export default function Notes() {
  const router = useRouter();
  const {
    userNotes,
    setUserNotes,
    noteToModify,
    setNoteToModify,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();
  const [notesStatus, setNotesStatus] = useState("active");
  const tokenInitialValue = sessionStorage.getItem("token");
  const [token] = useState(tokenInitialValue);
  const userIdInitialValue = sessionStorage.getItem("userId");
  const [userId] = useState(userIdInitialValue);

  const notesStatusToggler = () => {
    setNotesStatus(notesStatus === "active" ? "archived" : "active");
    setUserNotes([]);
  };

  const fetchUserNotes = () => {
    !userNotes.length &&
      axios
        .get(`http://localhost:5000/api/notes/${userId}/${notesStatus}`)
        .then((res) => setUserNotes(res.data));
  };

  useEffect(() => {
    if (!token) {
      setNotesStatus("active");
      setUserNotes([]);
      router.replace("/");
    } else {
      axios.get("http://localhost:5000/api/users/profile/", {
        headers: { token },
      });
    }
    fetchUserNotes();
  }, [token, userNotes.length, notesStatus]);

  return (
    <div className="bg-white flex flex-col place-items-center min-h-screen">
      <div className={`${modalIsOpen && "opacity-20"}`}>
        <div className="flex flex-row mt-14 w-full max-w-5xl justify-around items-center">
          <h1 className="font-medium text-4xl">My {notesStatus} notes</h1>
          <button
            className="bg-green-400 text-slate-50 font-inter font-bold text-lg
                                w-auto px-2 h-11 rounded-lg"
            onClick={() => setModalIsOpen(true)}
          >
            Create new note
          </button>
          <button
            className={`bg-slate-400 text-slate-50 font-inter font-bold text-lg w-auto px-2 h-11 rounded-lg`}
            onClick={notesStatusToggler}
          >
            {notesStatus === "active" ? "Archived notes" : "Active notes"}
          </button>
          <button
            className="bg-red-400 text-slate-50 font-inter font-bold text-lg
                                w-28 h-11 rounded-lg"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
            }}
          >
            Logout
          </button>
        </div>

        <main>
          <div className="bg-cork-pad bg-cover w-[886px] min-h-[720px] grid grid-cols-2  place-content-start py-6 mt-12 rounded-2xl">
            {!!userNotes.length &&
              userNotes.map((note: Note) => {
                return (
                  <div
                    className="bg-green-200 h-[124px] w-[396px] p-4 flex flex-row my-3 mx-auto rounded-xl"
                    key={note.id}
                  >
                    <div className="w-1/5 mr-3">
                      {/* Acá un ícono de nota que al clickearlo da detalles */}
                      <FaNoteSticky className="text-8xl" />
                    </div>

                    <div className="w-4/5 flex flex-col mt-2">
                      <h1 className="text-xl font-semibold self-center">
                        {note.title}
                      </h1>
                      <div className="relative h-full">
                        <div className="bg-green-100 absolute right-0 bottom-0 flex flex-row justify-around w-2/5  pt-1.5 rounded-md">
                          <div
                            onClick={() => {
                              setNoteToModify({
                                note,
                                action:
                                  notesStatus === "active"
                                    ? "archive"
                                    : "restore",
                              });
                              setModalIsOpen(true);
                            }}
                          >
                            {notesStatus === "active" ? (
                              <MdArchive className="text-3xl" />
                            ) : (
                              <MdUnarchive className="text-3xl" />
                            )}
                          </div>
                          <div
                            onClick={() => {
                              setNoteToModify({ note, action: "edit" });
                              setModalIsOpen(true);
                            }}
                          >
                            <MdEdit className="text-3xl" />
                          </div>
                          <div
                            onClick={() => {
                              setNoteToModify({ note, action: "delete" });
                              setModalIsOpen(true);
                            }}
                          >
                            <FaTrashCan className="text-2xl mt-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>

      {modalIsOpen && noteToModify.action === "delete" ? (
        <DeleteNoteModal />
      ) : modalIsOpen &&
        (noteToModify.action === "archive" ||
          noteToModify.action === "restore") ? (
        modalIsOpen && <ToggleNoteStatusModal />
      ) : (
        modalIsOpen && <CreateOrEditNoteModal />
      )}
    </div>
  );
}
