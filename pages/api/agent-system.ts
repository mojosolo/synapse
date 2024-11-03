import type { NextApiRequest, NextApiResponse } from 'next';
import { AgentExecutor } from '@/utils/agents/AgentExecutor';

const agentExecutor = new AgentExecutor();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { input } = req.body;
    try {
      const output = await agentExecutor.execute(input);
      res.status(200).json({ output });
    } catch (error: any) {
      console.error('Agent system execution error:', error);
      res.status(500).json({ error: error.message || 'An error occurred during agent execution.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST instead.' });
  }
} 