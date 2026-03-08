import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
} from '@heroui/react';
import { FaStickyNote } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { IoIosCreate } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import axios from 'axios';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';
import { NotesContext } from '../../context/NotesContext';
import DeleteNoteModal from './DeleteNoteModal';
import UpdateNoteModal from './UpdateNoteModal';

function MyNotes() {
  const { userToken } = useContext(AuthContext);
  const { notesVersion } = useContext(NotesContext);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log('MyNotes Component - userToken:', userToken);
    console.log('notesVersion:', notesVersion);
  }, [userToken, notesVersion]);

  const getUserNotes = async () => {
    try {
      console.log('Starting API call...');
      console.log('Token being sent:', `3b8ny__${userToken}`);

      const res = await axios.get(
        'https://note-sigma-black.vercel.app/api/v1/notes',
        {
          headers: { token: `3b8ny__${userToken}` },
        }
      );

      console.log('API Response received');
      console.log('Status:', res.status);
      console.log('Full response data:', res.data);

      const notes = res.data?.notes || res.data;
      console.log('Extracted notes:', notes);
      console.log('Is array?:', Array.isArray(notes));
      console.log(
        'Length:',
        Array.isArray(notes) ? notes.length : 'NOT AN ARRAY'
      );

      const finalNotes = Array.isArray(notes) ? notes : [];
      console.log('Final notes to return:', finalNotes);

      return finalNotes;
    } catch (err) {
      console.error('ERROR CAUGHT:');
      console.error('Error object:', err);
      console.error('Response:', err.response);
      console.error('Status:', err.response?.status);
      console.error('Data:', err.response?.data);
      console.error('Message:', err.message);

      if (err.response && err.response.status === 404) {
        console.log('Got 404, returning empty array');
        return [];
      }

      console.error('Throwing error to React Query');
      throw err;
    }
  };

  const {
    data: myNotes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['myNotes', notesVersion],
    queryFn: getUserNotes,
    enabled: !!userToken,
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    console.log('Query State:', {
      isLoading,
      isError,
      hasData: !!myNotes,
      dataType: Array.isArray(myNotes) ? 'array' : typeof myNotes,
      length: Array.isArray(myNotes) ? myNotes.length : 'N/A',
    });
  }, [isLoading, isError, myNotes]);

  const notesArray = Array.isArray(myNotes) ? [...myNotes].reverse() : [];

  console.log('🎯 Final notesArray for rendering:', notesArray);

  const handleDeleteClick = note => {
    setSelectedNote(note);
    setDeleteModalOpen(true);
  };

  const handleUpdateClick = note => {
    setSelectedNote(note);
    setUpdateModalOpen(true);
  };

  const formatDate = dateString => {
    return dateString.split('T')[0];
  };

  const truncateContent = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!userToken) {
    console.log('🚫 No token, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    console.log('⏳ Loading state');
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log('💥 Error state:', error);
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorPage error={error.message} />
      </div>
    );
  }

  // console.log('Rendering notes. Count:', notesArray.length);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          My Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {notesArray.length} {notesArray.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      {notesArray.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center px-6 py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaStickyNote className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              Create your first note to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {notesArray.map((note, index) => {
            console.log(`📋 Rendering note ${index}:`, note);
            return (
              <Card
                key={note._id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex gap-3 pb-3">
                  <div className="p-2.5 bg-linear-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
                    <FaStickyNote
                      size={20}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {note.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="primary"
                      onPress={() => handleUpdateClick(note)}
                      className="hover:scale-110 transition-transform"
                    >
                      <MdEdit size={18} />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => handleDeleteClick(note)}
                      className="hover:scale-110 transition-transform"
                    >
                      <MdDelete size={18} />
                    </Button>
                  </div>
                </CardHeader>

                <Divider className="opacity-50" />

                <CardBody className="py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {truncateContent(note.content)}
                  </p>
                </CardBody>

                <Divider className="opacity-50" />

                <CardFooter className="flex items-center justify-between gap-3 pt-3 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <IoIosCreate size={16} className="shrink-0" />
                    <span className="font-medium">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>

                  {formatDate(note.createdAt) !==
                    formatDate(note.updatedAt) && (
                    <div className="flex items-center gap-1.5">
                      <GrUpdate size={14} className="shrink-0" />
                      <span className="font-medium">
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {selectedNote && (
        <>
          <DeleteNoteModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedNote(null);
            }}
            note={selectedNote}
            userToken={userToken}
            onSuccess={refetch}
          />
          <UpdateNoteModal
            isOpen={updateModalOpen}
            onClose={() => {
              setUpdateModalOpen(false);
              setSelectedNote(null);
            }}
            note={selectedNote}
            userToken={userToken}
            onSuccess={refetch}
          />
        </>
      )}
    </div>
  );
}

export default MyNotes;
