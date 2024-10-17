import React, { useState, useEffect } from 'react';
import { Zap, MessageCircle, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { IcebreakerAnswer } from '../types';

interface Question {
  id: number;
  text: string;
}

const IcebreakerGames: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<IcebreakerAnswer[]>([]);

  const questions: Question[] = [
    { id: 1, text: "If you could have dinner with any historical figure, who would it be and why?" },
    { id: 2, text: "What's the most adventurous thing you've ever done?" },
    { id: 3, text: "If you could instantly become an expert in one subject, what would it be?" },
    { id: 4, text: "What's your favorite childhood memory?" },
    { id: 5, text: "If you could travel anywhere in the world right now, where would you go?" },
    { id: 6, text: "What's a skill you'd like to learn or improve?" },
    { id: 7, text: "What's the best piece of advice you've ever received?" },
    { id: 8, text: "If you could have any superpower, what would it be and why?" },
    { id: 9, text: "What's a book or movie that has significantly impacted your life?" },
    { id: 10, text: "If you could switch lives with anyone for a day, who would it be?" },
  ];

  useEffect(() => {
    if (gameStarted && !currentQuestion) {
      getNextQuestion();
    }
  }, [gameStarted, currentQuestion]);

  const startGame = () => {
    setGameStarted(true);
    setAnsweredQuestions([]);
  };

  const getNextQuestion = () => {
    const unansweredQuestions = questions.filter(q => !answeredQuestions.some(a => a.question === q.text));
    if (unansweredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
      setCurrentQuestion(unansweredQuestions[randomIndex]);
    } else {
      setCurrentQuestion(null);
    }
    setUserAnswer('');
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion) {
      const newAnswer: IcebreakerAnswer = {
        question: currentQuestion.text,
        answer: userAnswer,
      };
      setAnsweredQuestions([...answeredQuestions, newAnswer]);
      getNextQuestion();
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setAnsweredQuestions([]);
    setCurrentQuestion(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Zap className="mr-2 text-yellow-500" />
        Icebreaker Games
      </h2>

      {!gameStarted ? (
        <div className="text-center">
          <p className="mb-4">Ready to break the ice? Start the game to get fun and interesting questions!</p>
          <button
            onClick={startGame}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          {currentQuestion ? (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Question:</h3>
              <p className="text-gray-700 mb-4">{currentQuestion.text}</p>
              <form onSubmit={handleSubmitAnswer}>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={4}
                  placeholder="Type your answer here..."
                  required
                ></textarea>
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={getNextQuestion}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Submit Answer
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">Great job! You've answered all the questions.</p>
              <button
                onClick={resetGame}
                className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center mx-auto"
              >
                <RefreshCw size={18} className="mr-2" />
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {answeredQuestions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Icebreaker Answers</h3>
          <div className="space-y-4">
            {answeredQuestions.map((answer, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium mb-2">{answer.question}</p>
                <p className="text-gray-700">{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">How to Play</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Start the game to receive random icebreaker questions</li>
          <li>Think about your answer and type it in the text area</li>
          <li>Submit your answer or skip to the next question if you prefer</li>
          <li>Use these questions and answers to start conversations with your matches</li>
          <li>Have fun and be creative with your responses!</li>
        </ul>
      </div>
    </div>
  );
};

export default IcebreakerGames;