import React from 'react';

const AIChatbotSection: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">AI Chatbot</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Smart Assistance at Your Fingertips
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our AI-powered chatbot helps you manage tasks efficiently, offering smart recommendations and timely reminders to keep you on track.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Instant Task Management</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Quickly add or modify tasks with simple commands. Let AI take care of organizing your to-do list.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Get answers and suggestions any time of the day to ensure you're never stuck on your tasks.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotSection;
