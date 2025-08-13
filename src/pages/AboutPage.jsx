import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">About Us</h1>
        
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80" 
              alt="Why Transparency Matters" 
              className="rounded-xl shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Product Transparency Matters</h2>
            <p className="text-gray-600 mb-4">
              In today's world, consumers deserve to know exactly what's in the products they use every day. Product transparency isn't just a trend—it's a fundamental right that empowers individuals to make informed choices about the products they bring into their homes and put on their bodies.
            </p>
            <p className="text-gray-600">
              Our mission is to provide clear, accessible information about product ingredients, sourcing practices, and environmental impact. We believe that transparency builds trust, and that consumers should have all the information they need to choose products that align with their values and health priorities.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-secondary rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Health</h3>
            <p className="text-gray-600">
              Understanding what's in your products helps you avoid ingredients that may cause allergic reactions, skin irritation, or other health concerns. Our detailed ingredient analysis gives you the knowledge to protect your health and wellbeing.
            </p>
          </div>
          
          <div className="bg-secondary rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Wisdom</h3>
            <p className="text-gray-600">
              Knowledge is power. By providing detailed information about product ingredients and their impacts, we empower you to make wiser consumer choices that align with your personal values and priorities.
            </p>
          </div>
          
          <div className="bg-secondary rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Virtue</h3>
            <p className="text-gray-600">
              Transparency encourages companies to adopt more ethical practices in sourcing, manufacturing, and packaging. By supporting transparent brands, you're helping to create a marketplace that values honesty and responsibility.
            </p>
          </div>
        </div>
        
        <div className="bg-primary bg-opacity-5 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Approach</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            We use advanced AI technology to analyze product ingredients and provide easy-to-understand summaries of potential health and environmental impacts. Our goal is to make complex information accessible to everyone, regardless of their scientific background.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;