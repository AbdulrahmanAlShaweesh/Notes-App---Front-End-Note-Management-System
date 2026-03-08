import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NoteCard from '../../components/NoteCard/NoteCard';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

function AllNotes() {
  const { userToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllNotes = async () => {
    return axios.get(
      'https://note-sigma-black.vercel.app/api/v1/notes/allNotes'
    );
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['allNotes'],
    queryFn: getAllNotes,
  });

  const allNotes = [...(data?.data?.notes || [])].reverse();

  const notesPerPage = 12;
  const totalPages = Math.ceil(allNotes.length / notesPerPage);
  const paginatedNotes = allNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const handlePageChange = page => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Notes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {allNotes.length} {allNotes.length === 1 ? 'note' : 'notes'} available
        </p>
      </div>

      {allNotes.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center px-6 py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              Start creating your first note to get organized
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {paginatedNotes?.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center pb-8">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllNotes;
