import React from 'react';

function ErrorPage({ error }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center px-6 py-12 bg-red-50 rounded-xl border border-red-200 max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
