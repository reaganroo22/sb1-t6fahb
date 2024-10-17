import React, { useState } from 'react';
import { MessageSquare, Send, Lightbulb, X } from 'lucide-react';

interface RizzAIProps {
  onSuggestion: (suggestion: string) => void;
}

const RizzAI: React.FC<RizzAIProps> = ({ onSuggestion }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setIsLoading(true);

    // Here you would typically send the input to your AI service and get a response
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      const suggestions = [
        "That's really interesting! Can you tell me more about how that experience shaped your perspective?",
        "I love your take on that. What inspired you to develop such a unique point of view?",
        "Your passion for this topic is contagious! Have you considered turning it into a creative project?",
        "I'm fascinated by your approach. How do you think this idea could be applied to solve real-world problems?",
        "Your insights are truly thought-provoking. How do you stay so well-informed on these subjects?",
      ];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      onSuggestion(randomSuggestion);
      setInput('');
      setIsLoading(false);
    }, 1500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed bottom-20 right-4 bg-white rounded-lg shadow-md transition-all duration-300 ${isMinimized ? 'w-12 h-12' : 'w-80 p-4'}`}>
      {isMinimized ? (
        <button onClick={toggleMinimize} className="w-full h-full flex items-center justify-center text-yellow-500 hover:bg-yellow-100 rounded-lg">
          <MessageSquare size={24} />
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold flex items-center">
              <MessageSquare size={16} className="mr-2 text-yellow-500" />
              Rizz AI
            </h3>
            <button onClick={toggleMinimize} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the conversation context..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <>
                  <Lightbulb size={16} className="mr-2" />
                  Get Suggestion
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Rizz AI helps you craft engaging responses and keep the conversation flowing smoothly.
          </p>
        </>
      )}
    </div>
  );
};

export default RizzAI;