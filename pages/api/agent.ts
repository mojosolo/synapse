import type { NextApiRequest, NextApiResponse } from 'next';
import { MeetingAgent } from '@/utils/agents/meetingAgent';

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  output: string;
}

const agent = new MeetingAgent();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method === 'POST') {
    const { input } = req.body;

    if (typeof input !== 'string' || !input.trim()) {
      return res.status(400).json({ error: 'Invalid input provided.' });
    }

    try {
      const output = await agent.execute(input);
      return res.status(200).json({ output });
    } catch (error) {
      const err = error as Error;
      console.error('Agent execution error:', err);
      
      return res.status(500).json({ 
        error: err.message || 'An unexpected error occurred.' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed. Use POST instead.' });
}