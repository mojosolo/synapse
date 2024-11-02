import type { NextApiRequest, NextApiResponse } from "next";
import { MeetingOrchestrator } from "@/utils/agents/meetingOrchestrator";

interface PlatformConfig {
  apiKey: string;
  apiSecret: string;
}

const getPlatformConfigs = (): Map<string, PlatformConfig> => {
  const configs = new Map<string, PlatformConfig>();
  
  const platforms = ['zoom', 'teams', 'meet'] as const;
  
  platforms.forEach(platform => {
    const apiKey = process.env[`${platform.toUpperCase()}_API_KEY`];
    const apiSecret = process.env[`${platform.toUpperCase()}_API_SECRET`];
    
    if (apiKey && apiSecret) {
      configs.set(platform, {
        apiKey,
        apiSecret,
      });
    }
  });
  
  return configs;
};

const platformConfigs = getPlatformConfigs();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { meetingId, platform } = req.body;

  if (!meetingId || typeof meetingId !== 'string') {
    return res.status(400).json({ message: "Invalid or missing meetingId." });
  }

  if (!platform || typeof platform !== 'string') {
    return res.status(400).json({ message: "Invalid or missing platform." });
  }

  const platformConfig = platformConfigs.get(platform.toLowerCase());

  if (!platformConfig) {
    return res.status(400).json({ message: `Unsupported platform: ${platform}` });
  }

  try {
    const orchestrator = new MeetingOrchestrator(platformConfig);
    const result = await orchestrator.processMeetingRecording(
      meetingId, 
      platform.toLowerCase()
    );

    return res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    console.error("Meeting processing error:", err);
    return res.status(500).json({ 
      message: err.message || "An error occurred while processing the meeting." 
    });
  }
}