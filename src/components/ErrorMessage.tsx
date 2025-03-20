import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  actionText?: string;
  actionHref?: string;
  statusCode?: number;
}

export default function ErrorMessage({
  title = 'Access Denied',
  message,
  actionText = 'Go Back',
  actionHref = '/',
  statusCode = 401,
}: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {statusCode && (
              <p className="text-6xl font-bold text-red-600 mb-4">{statusCode}</p>
            )}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>
            {actionHref && (
              <a
                href={actionHref}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {actionText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
