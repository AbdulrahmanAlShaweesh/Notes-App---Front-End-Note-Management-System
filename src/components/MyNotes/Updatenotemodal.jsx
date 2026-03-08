import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from '@heroui/react';
import { MdEdit, MdSave } from 'react-icons/md';
import axios from 'axios';

function UpdateNoteModal({ isOpen, onClose, note, userToken, onSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const formatDate = dateString => {
    return dateString.split('T')[0];
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        {
          title: title.trim(),
          content: content.trim(),
        },
        {
          headers: { token: `3b8ny__${userToken}` },
        }
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.message || 'Failed to update note');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      backdrop="blur"
      size="2xl"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MdEdit className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <span>Update Note</span>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter note title"
              value={title}
              onValueChange={setTitle}
              variant="bordered"
              isInvalid={error && !title.trim()}
              errorMessage={error && !title.trim() ? 'Title is required' : ''}
              classNames={{
                input: 'text-base',
                label: 'text-sm font-medium',
              }}
            />

            <Textarea
              label="Content"
              placeholder="Enter note content"
              value={content}
              onValueChange={setContent}
              variant="bordered"
              minRows={8}
              maxRows={16}
              isInvalid={error && !content.trim()}
              errorMessage={
                error && !content.trim() ? 'Content is required' : ''
              }
              classNames={{
                input: 'text-base',
                label: 'text-sm font-medium',
              }}
            />

            {error && title.trim() && content.trim() && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Created: {formatDate(note.createdAt)}</p>
              <p>Last updated: {formatDate(note.updatedAt)}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={handleClose} isDisabled={isUpdating}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleUpdate}
            isLoading={isUpdating}
            startContent={!isUpdating && <MdSave size={18} />}
          >
            {isUpdating ? 'Updating...' : 'Update Note'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateNoteModal;
