import { NextApiRequest, NextApiResponse } from "next";
import { AgentFactory, AgentType } from "@/utils/agents";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { type, input } = req.body;
    
    if (!type || !input) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const agent = AgentFactory.createAgent(type as AgentType);
    const result = await agent.execute(input);

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Agent execution error:", error);
    return res.status(500).json({ message: error.message });
  }
}