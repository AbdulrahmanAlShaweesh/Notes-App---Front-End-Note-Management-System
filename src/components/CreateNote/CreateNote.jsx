import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
} from '@heroui/react';
import { MdTitle, MdDescription } from 'react-icons/md';
import axios from 'axios';
import { NotesContext } from '../../context/NotesContext';

function CreateNote({ onClose }) {
  const { userToken } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setNotesVersion } = useContext(NotesContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async data => {
    try {
      const response = await axios.post(
        'https://note-sigma-black.vercel.app/api/v1/notes',
        data,
        {
          headers: {
            token: `3b8ny__${userToken}`,
          },
        }
      );

      if (response.data.msg === 'done') {
        setIsSuccess(true);
        setNotesVersion(prev => prev + 1);
        reset();
        if (onClose) {
          onClose(false);
        }
      }
    } catch (error) {
      console.error(error);
      setIsError(error.response?.data?.msg || 'Failed to create note');
    }
  };

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-col items-start gap-2 pb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Note Details
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill in the information below to create your note
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Input
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Title must not exceed 100 characters',
                  },
                })}
                label="Title"
                placeholder="Enter note title"
                startContent={<MdTitle className="text-gray-400" size={20} />}
                variant="bordered"
                labelPlacement="outside"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                classNames={{
                  input: 'text-base',
                  inputWrapper: 'h-12',
                }}
              />
            </div>

            <div className="space-y-2">
              <Textarea
                {...register('content', {
                  required: 'Content is required',
                  minLength: {
                    value: 10,
                    message: 'Content must be at least 10 characters',
                  },
                  maxLength: {
                    value: 5000,
                    message: 'Content must not exceed 5000 characters',
                  },
                })}
                label="Content"
                placeholder="Write your note content here..."
                startContent={
                  <MdDescription className="text-gray-400 mt-2" size={20} />
                }
                variant="bordered"
                labelPlacement="outside"
                minRows={8}
                isInvalid={!!errors.content}
                errorMessage={errors.content?.message}
                classNames={{
                  input: 'text-base',
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="flex-1 font-semibold"
              >
                {isSubmitting ? 'Creating...' : 'Create Note'}
              </Button>
            </div>
            {isError && (
              <p className="text-red-500 mt-2 text-sm font-semibold">
                {isError}
              </p>
            )}
            {isSuccess && (
              <p className="text-green-500 mt-2 text-sm font-semibold">
                Note created successfully!
              </p>
            )}
          </form>
        </CardBody>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <span className="font-semibold">Tip:</span> Use clear, descriptive
          titles to make your notes easier to find later.
        </p>
      </div>
    </div>
  );
}

export default CreateNote;
