export interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  values: string[];
  compatibilityScore: number;
  premium: boolean;
  icebreakerAnswers: IcebreakerAnswer[];
  growthGoals?: GrowthGoal[];
}

export interface User {
  id: string;
  name: string;
  premium: boolean;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface GrowthGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
}

export interface IcebreakerAnswer {
  question: string;
  answer: string;
}

// Add more interfaces as needed