import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NotesContext } from '../../context/NotesContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function MyNotesCount() {
  const { userToken } = useContext(AuthContext);
  const { notesVersion } = useContext(NotesContext);

  const { data } = useQuery({
    queryKey: ['myNotes', notesVersion],
    queryFn: async () => {
      const res = await axios.get(
        'https://note-sigma-black.vercel.app/api/v1/notes',
        {
          headers: { token: `3b8ny__${userToken}` },
        }
      );
      return res.data.notes || [];
    },
    enabled: !!userToken,
  });

  return Array.isArray(data) ? data.length : 0;
}

export default MyNotesCount;
