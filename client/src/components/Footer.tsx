import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} Your Brand —
          <a href="https://caktus.ai" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">
            dungpham.ai
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
