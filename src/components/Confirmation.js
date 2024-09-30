import React from 'react';

const Confirmation = ({ formData }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 text-green-500 text-5xl">✔</div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your onboarding form has been submitted successfully.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  What's next?
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    One of our team members will be in touch with you shortly. We're excited to have you join the Audiology Plus family!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <a
              href="https://audiologyplus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;