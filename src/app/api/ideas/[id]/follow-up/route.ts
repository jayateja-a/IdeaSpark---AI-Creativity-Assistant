import { NextRequest, NextResponse } from 'next/server';
import { generateFollowUpAnswer } from '@/lib/ai';
import { storage } from '@/lib/storage';
import { FollowUpQuestion } from '@/types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { question } = await request.json();
    const ideaId = params.id;
    
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // Get the idea to include context
    const idea = storage.getIdeaById(ideaId);
    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    // Generate AI answer
    const answer = await generateFollowUpAnswer(idea.idea, question);
    
    // Create follow-up question object
    const followUpQuestion: FollowUpQuestion = {
      id: crypto.randomUUID(),
      question,
      answer,
      createdAt: new Date()
    };

    // Save to storage
    storage.addFollowUpQuestion(ideaId, followUpQuestion);

    return NextResponse.json(followUpQuestion);
  } catch (error) {
    console.error('Error creating follow-up question:', error);
    return NextResponse.json({ error: 'Failed to create follow-up question' }, { status: 500 });
  }
}
