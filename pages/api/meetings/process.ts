import { NextApiRequest, NextApiResponse } from "next";
import { MeetingOrchestrator } from "@/utils/agents/meetingOrchestrator";

const platformConfigs = {
  zoom: {
    apiKey: process.env.ZOOM_API_KEY!,
    apiSecret: process.env.ZOOM_API_SECRET
  },
  teams: {
    apiKey: process.env.TEAMS_API_KEY!,
    apiSecret: process.env.TEAMS_API_SECRET
  }
};

const orchestrator = new MeetingOrchestrator(platformConfigs);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { meetingId, platform } = req.body;

    const result = await orchestrator.processMeetingRecording(meetingId, platform);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Meeting processing error:", error);
    return res.status(500).json({ message: error.message });
  }
}