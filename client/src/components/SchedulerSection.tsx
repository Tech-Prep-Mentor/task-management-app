import React from 'react';

const SchedulerSection: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Scheduler</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Organize Your Day Like a Pro
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our integrated scheduler harmonizes with your task list, ensuring you never miss a beat with your projects and meetings.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Calendar Integration</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Sync with your existing calendars to get a unified view of your schedules and tasks.
              </dd>
            </div>
            <div className="relative">
              <dt>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automated Reminders</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Stay ahead of your deadlines with automated reminders for your most critical tasks and appointments.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SchedulerSection;
