"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Note } from "../interfaces/Note";

interface ContextProps {
  loggedUserId: string;
  setLoggerUserId: Dispatch<SetStateAction<string>>;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  data: Array<Note>;
  setData: Dispatch<SetStateAction<Array<Note>>>;
}

const GlobalContext = createContext<ContextProps>({
  loggedUserId: "",
  setLoggerUserId: (): string => "",
  modalIsOpen: false,
  setModalIsOpen: (): boolean => false,
  data: [],
  setData: (): Array<Note> => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [loggedUserId, setLoggerUserId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState<[] | Array<Note>>([]);

  return (
    <GlobalContext.Provider
      value={{
        loggedUserId,
        setLoggerUserId,
        modalIsOpen,
        setModalIsOpen,
        data,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
