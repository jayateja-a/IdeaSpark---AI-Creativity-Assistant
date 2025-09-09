import { NextRequest, NextResponse } from 'next/server';
import { generateIdeaAnalysis } from '@/lib/ai';
import { storage } from '@/lib/storage';
import { Idea } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();
    
    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    // Generate AI analysis
    const analysis = await generateIdeaAnalysis(idea);
    
    // Create new idea object
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      idea,
      tagline: analysis.tagline,
      improvement: analysis.improvement,
      createdAt: new Date(),
      followUpQuestions: []
    };

    // Save to storage
    storage.saveIdea(newIdea);

    return NextResponse.json(newIdea);
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json({ error: 'Failed to create idea' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ideas = storage.getAllIdeas();
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json({ error: 'Failed to fetch ideas' }, { status: 500 });
  }
}
