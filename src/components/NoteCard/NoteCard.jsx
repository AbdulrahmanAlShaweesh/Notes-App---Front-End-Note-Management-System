import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react';
import { FaStickyNote } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { IoIosCreate } from 'react-icons/io';

function NoteCard({ note }) {
  const { title, content, createdAt, updatedAt } = note;

  const formatDate = dateString => {
    return dateString.split('T')[0];
  };

  const truncateContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="max-w-[400px] hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
      <CardHeader className="flex gap-3 pb-3">
        <div className="p-2.5 bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <FaStickyNote
            size={22}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </p>
        </div>
      </CardHeader>

      <Divider className="opacity-50" />

      <CardBody className="py-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
          {truncateContent(content)}
        </p>
      </CardBody>

      <Divider className="opacity-50" />

      <CardFooter className="flex items-center justify-between gap-3 pt-3 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5 group/created hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <IoIosCreate size={16} className="shrink-0" />
          <span className="font-medium">{formatDate(createdAt)}</span>
        </div>

        {formatDate(createdAt) !== formatDate(updatedAt) && (
          <div className="flex items-center gap-1.5 group/updated hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <GrUpdate size={14} className="shrink-0" />
            <span className="font-medium">{formatDate(updatedAt)}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
