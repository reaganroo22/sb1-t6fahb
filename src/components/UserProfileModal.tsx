import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Profile } from '../types';

interface UserProfileModalProps {
  profile: Profile;
  onClose: () => void;
  subscription: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ profile, onClose, subscription }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % profile.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + profile.photos.length) % profile.photos.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isFullScreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white rounded-lg overflow-hidden ${isFullScreen ? 'w-full h-full' : 'max-w-2xl w-full max-h-[90vh]'}`}>
        <div className="relative">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={`${profile.name}'s photo`}
            className={`w-full ${isFullScreen ? 'h-screen object-contain' : 'h-96 object-cover'}`}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 z-10"
          >
            <X size={24} />
          </button>
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 left-4 bg-white rounded-full p-2 z-10"
          >
            {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
          <button
            onClick={prevPhoto}
            className="absolute top-1/2 left-4 bg-white rounded-full p-2 transform -translate-y-1/2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 right-4 bg-white rounded-full p-2 transform -translate-y-1/2"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={`p-6 ${isFullScreen ? 'overflow-y-auto h-[calc(100vh-24rem)]' : ''}`}>
          <h2 className="text-2xl font-bold mb-2">{profile.name}, {profile.age}</h2>
          <p className="text-gray-600 mb-4">{profile.location}</p>
          <p className="text-gray-800 mb-4">{profile.bio}</p>
          
          <h3 className="font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.interests.map((interest, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {interest}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold mb-2">Values</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.values.map((value, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold mb-2">Icebreaker Answers</h3>
          <div className="space-y-2 mb-4">
            {profile.icebreakerAnswers.map((answer, index) => (
              <div key={index}>
                <p className="font-medium">{answer.question}</p>
                <p className="text-gray-600">{answer.answer}</p>
              </div>
            ))}
          </div>
          
          {subscription !== 'free' && profile.growthGoals && (
            <>
              <h3 className="font-semibold mb-2">Personal Growth Goals</h3>
              <div className="space-y-2 mb-4">
                {profile.growthGoals.map((goal, index) => (
                  <div key={index}>
                    <p className="font-medium">{goal.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-pink-500 h-2.5 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;