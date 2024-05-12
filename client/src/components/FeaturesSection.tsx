import React from 'react';
import { useNavigate } from 'react-router-dom';


interface FeatureProps{
  title: string;
  description: string;
  link: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, link }) => {
  let navigate = useNavigate();

  const handleLink = () => {
    navigate(`/${link}`)
  }

  return (
    <div onClick={handleLink} className="bg-gray-100 p-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 cursor-pointer">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">App Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature 
            title="Quiz Generator" 
            description="Use AI to generate quiz for you. Learning has never been easier."
            link="aitutor/quiz"
          />
          <Feature 
            title="AI Chatbot" 
            description="Get instant assistance and smart recommendations from our AI." 
            link="aitutor/chatbot/"
          />
          <Feature 
            title="Scheduler" 
            description="Easily schedule tasks and meetings with integrated calendar views." 
            link=""
          />
          <Feature 
            title="Real-time Collaboration" 
            description="Collaborate with your team in chat rooms designed for efficient communication." 
            link='chat'
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
