import { sendPayload } from '@/lib/sendPayLoad';
import { searchEngineForSources } from '@/lib/source';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log("message received");
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    await sendPayload({ content: message });
    await searchEngineForSources(message);

    return NextResponse.json({ message: "Processing request" }, { status: 200 });  
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}