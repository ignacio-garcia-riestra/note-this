"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Note } from "../interfaces/Note";
import { NoteToModify } from "../interfaces/NoteToModify";

interface ContextProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  userNotes: Array<Note>;
  setUserNotes: Dispatch<SetStateAction<Array<Note>>>;
  noteToModify: NoteToModify;
  setNoteToModify: Dispatch<SetStateAction<NoteToModify>>;
  emptyNoteToModify: NoteToModify;
}

const emptyNoteToModify: NoteToModify = {
  note: {
    id: "",
    title: "",
    content: "",
  },
  action: "",
};

const GlobalContext = createContext<ContextProps>({
  modalIsOpen: false,
  setModalIsOpen: (): boolean => false,
  userNotes: [],
  setUserNotes: (): Array<Note> => [],
  noteToModify: emptyNoteToModify,
  setNoteToModify: (): NoteToModify => emptyNoteToModify,
  emptyNoteToModify
});

export const GlobalContextProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userNotes, setUserNotes] = useState<[] | Array<Note>>([]);
  const [noteToModify, setNoteToModify] = useState(emptyNoteToModify);

  return (
    <GlobalContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
        userNotes,
        setUserNotes,
        noteToModify,
        setNoteToModify,
        emptyNoteToModify
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
