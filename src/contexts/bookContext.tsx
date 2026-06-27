import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Books } from "../types/book.type";

type BookContextType = {
  openBook: Books | null;
  setOpenBook: Dispatch<SetStateAction<Books | null>>;
};

type BookProviderProps = {
  children: ReactNode;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: BookProviderProps) => {
  const [openBook, setOpenBook] = useState<Books | null>(null);

  return (
    <BookContext.Provider value={{ openBook, setOpenBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }

  return context;
};
