import { Idea, FollowUpQuestion } from '@/types';

// In-memory storage for demo purposes
// In production, this would be replaced with a database
let ideas: Idea[] = [];

export const storage = {
  // Ideas
  saveIdea: (idea: Idea): void => {
    ideas.push(idea);
  },
  
  getAllIdeas: (): Idea[] => {
    return [...ideas].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  getIdeaById: (id: string): Idea | undefined => {
    return ideas.find(idea => idea.id === id);
  },
  
  // Follow-up questions
  addFollowUpQuestion: (ideaId: string, question: FollowUpQuestion): void => {
    const idea = ideas.find(i => i.id === ideaId);
    if (idea) {
      idea.followUpQuestions.push(question);
    }
  },
  
  getFollowUpQuestions: (ideaId: string): FollowUpQuestion[] => {
    const idea = ideas.find(i => i.id === ideaId);
    return idea ? idea.followUpQuestions : [];
  }
};
