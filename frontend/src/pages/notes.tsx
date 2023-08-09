import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../app/globals.css";
import { useCookies } from "react-cookie";
import { Note } from "../../interfaces/Note";
import { MdArchive, MdUnarchive, MdEdit } from "react-icons/md";
import { FaTrashCan, FaNoteSticky } from "react-icons/fa6";

export default function Notes() {
  const router = useRouter();
  const user = router.query;
  const userId: string = user.id?.toString() || "";
  const [cookie, setCookie] = useCookies(["token"]);
  const initialNotesState: Array<Note> = [];
  const [notes, setNotes] = useState(initialNotesState);

  const fetchNotes = (userId: string) => {
    return axios
      .get(`http://localhost:5000/api/notes/all/${userId}`)
      .then((res) => res.data);
  };

  useEffect(() => {
    if (!cookie.token) {
      router.push("/");
    } else {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: cookie,
        })
        .then(() => fetchNotes(userId))
        .then((notes) => setNotes(notes));
    }
  }, [cookie]);

  return (
    <div className="bg-white flex flex-col place-items-center min-h-screen">
      <div className="flex flex-row mt-14 w-full max-w-5xl justify-around items-center">
        <h1 className="font-medium text-4xl">My active notes</h1>
        <button
          className="bg-green-400 text-slate-50 font-inter font-bold text-lg
                              w-auto px-2 h-11 rounded-lg"
          onClick={() => {}}
        >
          Create new note
        </button>
        <button
          className="bg-slate-00 text-slate-50 font-inter font-bold text-lg
                              w-auto px-2 h-11 rounded-lg"
          onClick={() => {}}
        >
          Archived notes
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

      <main>
        {notes.length && (
          <div className="bg-cork-pad bg-cover p-4 flex flex-row justify-between flex-wrap mt-20 mx-auto w-3/4 self-center rounded-2xl">
            {notes.map((note: Note) => {
              return (
                <div className="min-h-[120px] w-1/2 my-3" key={note.id}>
                  <div className="bg-green-200 p-4 flex flex-row h-full mx-3 rounded-xl">
                    <div className="w-1/5">
                      {/* Acá un ícono de nota que al clickearlo da detalles */}
                      <FaNoteSticky className="text-8xl" />
                    </div>

                    <div className="w-4/5 flex flex-col">
                      <h1 className="text-xl font-semibold self-center m-3">
                        {note.title}
                      </h1>
                      <div className="bg-green-100 flex flex-row justify-around self-end w-1/4 h-full pt-1.5 rounded-md">
                        <div>
                          <MdArchive className="text-3xl" />
                        </div>
                        <div>
                          <MdEdit className="text-3xl" />
                        </div>
                        <div>
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
