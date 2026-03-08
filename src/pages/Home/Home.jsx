import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import CreateNote from '../../components/CreateNote/CreateNote';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@heroui/react';
import MyNotes from '../../components/MyNotes/MyNotes';
import { FaAmericanSignLanguageInterpreting, FaPlus } from 'react-icons/fa';
import { FaStickyNote } from 'react-icons/fa';
import MyNotesCount from './MyNotesCount';

function Home() {
  const { userToken } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <FaStickyNote size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Notes Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage and organize your notes
                </p>
              </div>
            </div>

            {/* Create Note Button */}
            <Button
              onPress={onOpen}
              color="primary"
              size="lg"
              startContent={<FaPlus size={24} />}
              className="font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Create Note
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Statistics or Quick Actions */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Welcome Back! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Stay organized and productive with your personal notes. Create,
                edit, and manage your ideas all in one place.
              </p>

              <div className="relative mt-6 grid grid-cols-1 gap-4">
                <div className=" bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    <MyNotesCount />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your Notes
                  </div>
                </div>
                <div className="absolute top-[50%] right-10 translate-y-[-50%] ">
                  <FaAmericanSignLanguageInterpreting
                    size={75}
                    className="opacity-25"
                  />
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg p-6 border border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                💡 Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                    •
                  </span>
                  <span>Use descriptive titles to find notes easily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                    •
                  </span>
                  <span>Keep your notes concise and well-organized</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                    •
                  </span>
                  <span>Review and update your notes regularly</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Notes List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
            <MyNotes />
          </div>
        </div>

        {/* Create Note Modal */}
        <Modal
          isOpen={isOpen}
          scrollBehavior="inside"
          onOpenChange={onOpenChange}
          size="2xl"
          classNames={{
            backdrop: 'bg-black/50 backdrop-blur-sm',
            base: 'bg-white dark:bg-gray-800',
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                  <FaStickyNote
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Create New Note
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                    Add a new note to your collection
                  </p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="py-6">
              <CreateNote onClose={onOpenChange} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
