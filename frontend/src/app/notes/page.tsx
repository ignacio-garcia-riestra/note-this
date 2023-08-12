"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "../globals.css";
import { useCookies } from "react-cookie";
import { Note } from "../interfaces/Note";
import { MdArchive, MdUnarchive, MdEdit } from "react-icons/md";
import { FaTrashCan, FaNoteSticky } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/contex/store";
import { CreateOrEditNoteModal } from "../components/CreateOrEditNoteModal";
import { DeleteNoteModal } from "../components/DeleteNoteModal";

export default function Notes() {
  const router = useRouter();
  const {
    userNotes,
    setUserNotes,
    noteToModify,
    setNoteToModify,
    loggedUserId,
    modalIsOpen,
    setModalIsOpen,
  } = useGlobalContext();
  const [notesStatus, setNotesStatus] = useState("active");
  const [cookie, setCookie] = useCookies(["token"]);

  const notesStatusToggler = () => {
    setNotesStatus(notesStatus === "active" ? "archived" : "active");
    setUserNotes([]);
  };

  const fetchUserNotes = () => {
    !userNotes.length &&
      axios
        .get(`http://localhost:5000/api/notes/${loggedUserId}/${notesStatus}`)
        .then((res) => setUserNotes(res.data));
  };

  fetchUserNotes();

  useEffect(() => {
    if (!cookie.token) {
      setNotesStatus("active");
      setUserNotes([]);
      router.replace("/");
    } else {
      axios.get("http://localhost:5000/api/users/profile/", {
        headers: cookie,
      });
    }
  }, [cookie]);

  return (
    <div className="bg-white flex flex-col place-items-center min-h-screen">
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
          className={`bg-${
            notesStatus === "active" ? "slate" : "blue"
          }-400 text-slate-50 font-inter font-bold text-lg w-auto px-2 h-11 rounded-lg`}
          onClick={notesStatusToggler}
        >
          {notesStatus === "active" ? "Archived notes" : "Active notes"}
        </button>
        <button
          className="bg-red-400 text-slate-50 font-inter font-bold text-lg
                              w-28 h-11 rounded-lg"
          onClick={() => {
            setCookie("token", "");
          }}
        >
          Logout
        </button>
      </div>

      {modalIsOpen && noteToModify.action === "delete" ? (
        <DeleteNoteModal />
      ) : (
        modalIsOpen && <CreateOrEditNoteModal />
      )}

      <main>
        {userNotes.length && (
          <div className="bg-cork-pad bg-cover w-[886px] min-h-[720px] grid grid-cols-2  place-content-start py-6 mt-12 rounded-2xl">
            {userNotes.map((note: Note) => {
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
                        <button>
                          {notesStatus === "active" ? (
                            <MdArchive className="text-3xl" />
                          ) : (
                            <MdUnarchive className="text-3xl" />
                          )}
                        </button>
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
        )}
      </main>
    </div>
  );
}
