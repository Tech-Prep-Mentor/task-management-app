import React from 'react';

const Testimonial: React.FC<{ quote: string; author: string }> = ({ quote, author }) => {
  return (
    <blockquote className="bg-gray-100 p-6 rounded-lg italic">
      "{quote}"
      <footer className="mt-4">- {author}</footer>
    </blockquote>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
        <div className="mt-8 space-y-4">
          <Testimonial 
            quote="This app has revolutionized the way our team handles tasks. The AI suggestions are spot-on." 
            author="Alex Johnson, Product Manager" 
          />
          <Testimonial 
            quote="I've tried many task management tools, but this one stands out with its ease of use and powerful features." 
            author="Samantha Lee, Freelancer" 
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
