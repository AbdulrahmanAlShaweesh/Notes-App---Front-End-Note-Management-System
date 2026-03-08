import React from 'react';
import { Button } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

function Error404() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full text-center">
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-pulse">
              404
            </h1>
          </div>

          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, it happens to the best of us!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              as={Link}
              to="/"
              color="primary"
              size="lg"
              variant="shadow"
              startContent={<FaHome />}
              className="font-semibold min-w-[200px]"
            >
              Go to Homepage
            </Button>
            <Button
              onPress={() => navigate(-1)}
              color="default"
              size="lg"
              variant="bordered"
              startContent={<FaArrowLeft />}
              className="font-semibold min-w-[200px] border-2"
            >
              Go Back
            </Button>
          </div>

          {/* Error Code */}
          <div className="mt-12 text-xs text-gray-400 dark:text-gray-600">
            Error Code: 404 | Page Not Found
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
