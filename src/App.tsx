import React, { useState } from 'react';
import { UserPlus, Users, MessageSquare, TrendingUp, Zap, Video, Calendar, Settings as SettingsIcon } from 'lucide-react';
import ProfileVerification from './components/ProfileVerification';
import UserProfile from './components/UserProfile';
import Matching from './components/Matching';
import Messaging from './components/Messaging';
import PersonalGrowth from './components/PersonalGrowth';
import IcebreakerGames from './components/IcebreakerGames';
import VirtualDatePlanner from './components/VirtualDatePlanner';
import SettingsComponent from './components/Settings';
import SubscriptionManager from './components/SubscriptionManager';
import VideoChat from './components/VideoChat';

function App() {
  const [currentPage, setCurrentPage] = useState('matching');
  const [isVerified, setIsVerified] = useState(false);
  const [subscription, setSubscription] = useState('free');
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    premium: false,
  });

  const toggleSubscription = () => {
    const subscriptions = ['free', 'basic', 'premium', 'elite'];
    const currentIndex = subscriptions.indexOf(subscription);
    const nextIndex = (currentIndex + 1) % subscriptions.length;
    const newSubscription = subscriptions[nextIndex];
    setSubscription(newSubscription);
    setUser({ ...user, premium: newSubscription !== 'free' });
  };

  const handleUpgrade = (tier: string) => {
    setSubscription(tier);
    setUser({ ...user, premium: tier !== 'free' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'verification':
        return <ProfileVerification onVerified={() => setIsVerified(true)} />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'matching':
        return <Matching subscription={subscription} />;
      case 'messaging':
        return <Messaging subscription={subscription} />;
      case 'personalGrowth':
        return user.premium ? <PersonalGrowth /> : <SubscriptionManager onUpgrade={handleUpgrade} />;
      case 'icebreakers':
        return user.premium ? <IcebreakerGames /> : <SubscriptionManager onUpgrade={handleUpgrade} />;
      case 'virtualDate':
        return user.premium ? <VirtualDatePlanner /> : <SubscriptionManager onUpgrade={handleUpgrade} />;
      case 'videoChat':
        return user.premium ? <VideoChat /> : <SubscriptionManager onUpgrade={handleUpgrade} />;
      case 'settings':
        return <SettingsComponent subscription={subscription} onUpgrade={handleUpgrade} />;
      default:
        return <Matching subscription={subscription} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">Inclusive Dating App</h1>
        <button
          onClick={toggleSubscription}
          className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded-md text-sm"
        >
          Toggle Subscription (For Testing)
        </button>
        <p className="text-center text-sm mt-1">Current Subscription: {subscription}</p>
      </header>
      <main className="container mx-auto mt-8 p-4 pb-24">
        {isVerified ? (
          <div>
            {renderPage()}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
              <ul className="flex justify-around">
                <li>
                  <button onClick={() => setCurrentPage('profile')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <UserPlus size={24} />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('matching')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <Users size={24} />
                    <span>Match</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('messaging')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <MessageSquare size={24} />
                    <span>Messages</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('personalGrowth')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <TrendingUp size={24} />
                    <span>Growth</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('icebreakers')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <Zap size={24} />
                    <span>Icebreakers</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('virtualDate')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <Calendar size={24} />
                    <span>Virtual Date</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('videoChat')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <Video size={24} />
                    <span>Video Chat</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('settings')} className="flex flex-col items-center text-gray-600 hover:text-pink-500">
                    <SettingsIcon size={24} />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <ProfileVerification onVerified={() => setIsVerified(true)} />
        )}
      </main>
    </div>
  );
}

export default App;