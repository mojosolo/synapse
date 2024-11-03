import type { NextApiRequest, NextApiResponse } from 'next';
import { AgentExecutor } from '@/utils/agents/AgentExecutor';
import { ChatOpenAI } from "@langchain/openai";

const getTemperature = (creativity: string): number => {
  switch (creativity) {
    case 'low': return 0.3;
    case 'medium': return 0.5;
    case 'high': return 0.7;
    case 'super': return 0.9;
    default: return 0.5;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { input, creativity = 'medium' } = req.body;

    try {
      const model = new ChatOpenAI({
        modelName: "gpt4o-mini",
        temperature: getTemperature(creativity),
      });

      const agentExecutor = new AgentExecutor();
      const output = await agentExecutor.execute(input);
      
      res.status(200).json({ output });
    } catch (error: any) {
      console.error('Agent system execution error:', error);
      res.status(500).json({ 
        error: error.message || 'An error occurred during agent execution.' 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST instead.' });
  }
} 