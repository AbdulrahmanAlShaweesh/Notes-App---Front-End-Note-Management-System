import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { MdDelete, MdWarning } from 'react-icons/md';
import axios from 'axios';

function DeleteNoteModal({ isOpen, onClose, note, userToken, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        {
          headers: { token: `3b8ny__${userToken}` },
        }
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete note');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        {onModalClose => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <MdWarning
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              </div>
              <span>Delete Note</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete this note?
                </p>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {note.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {note.content}
                  </p>
                </div>

                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <MdWarning size={16} />
                  This action cannot be undone.
                </p>

                {error && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onModalClose}
                isDisabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={isDeleting}
                startContent={!isDeleting && <MdDelete size={18} />}
              >
                {isDeleting ? 'Deleting...' : 'Delete Note'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteNoteModal;
