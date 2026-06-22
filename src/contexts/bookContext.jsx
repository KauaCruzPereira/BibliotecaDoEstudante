import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [openBook, setOpenBook] = useState(null);

  return (
    <BookContext.Provider value={{ openBook, setOpenBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  return useContext(BookContext);
};
