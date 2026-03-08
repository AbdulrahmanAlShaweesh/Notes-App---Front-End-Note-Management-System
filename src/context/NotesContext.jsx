import { createContext, useState } from 'react';

// eslint-disable-next-line
export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notesVersion, setNotesVersion] = useState(0);

  return (
    <NotesContext.Provider value={{ notesVersion, setNotesVersion }}>
      {children}
    </NotesContext.Provider>
  );
}
