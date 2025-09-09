export interface Idea {
  id: string;
  idea: string;
  tagline: string;
  improvement: string;
  createdAt: Date;
  followUpQuestions: FollowUpQuestion[];
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
