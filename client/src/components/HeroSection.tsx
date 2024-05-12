import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-bold text-gray-900 ">
            SWE 1 - Smart Workflow Enhancement
          </h1>
          <p className="mb-8 leading-relaxed">
            Elevate your productivity with SWE 1, your AI-powered assistant. Integrate AI into your daily tasks, schedule with ease, and collaborate in real-time. Embrace the future of work by automating routine tasks, gaining insights from data, and enhancing team collaboration.
          </p>
          <p className="mb-8 leading-relaxed">
            From personal planners to team projects, SWE 1 adapts to your unique workflow needs. Our intuitive interface and powerful features streamline your process, so you can focus on what truly matters—innovation and growth.
          </p>
          <div className="flex mt-6 justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="/WebLogo.jpeg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
