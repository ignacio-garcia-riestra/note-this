import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../app/globals.css";
import { useCookies } from "react-cookie";

export default function Notes() {
  const router = useRouter();
  const user = router.query;
  const [cookie, setCookie] = useCookies(["token"]);

  useEffect(() => {
    console.log("enel useEffect");
    if (!cookie.token) {
      router.push("/");
    } else {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: cookie,
        })
        .then((res) => console.log(res));
    }
  }, [cookie]);

  return (
    <div className="bg-white flex flex-col place-items-center min-h-screen">
      <div className="flex flex-row mt-14 w-full max-w-5xl justify-around items-center">
        <h1 className="font-medium text-4xl">My active notes</h1>
        <button
          className="bg-green-400 text-white font-inter font-bold text-lg
                              w-auto px-2 h-11 rounded-lg"
          onClick={() => {}}
        >
          Create new note
        </button>
        <button
          className="bg-slate-300 text-slate-600 font-inter font-bold text-lg
                              w-auto px-2 h-11 rounded-lg"
          onClick={() => {}}
        >
          Archived notes
        </button>
        <button
          className="bg-red-300 text-white font-inter font-bold text-lg
                              w-28 h-11 rounded-lg"
          onClick={() => {
            setCookie("token", "");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
