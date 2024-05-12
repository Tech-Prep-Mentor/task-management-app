import React from 'react';

const ChatRoomsSection: React.FC = () => {
  return (
    <div className="py-12 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Chat Rooms</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Collaborate in Real-Time
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our chat rooms bring your team together, making it easy to share updates, brainstorm ideas, and keep everyone in the loop.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Dedicated Channels</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Create channels for different projects or topics, ensuring conversations are focused and organized.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">File Sharing</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Easily share documents and files directly in your chat rooms, keeping all relevant materials in one place.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomsSection;
