import { MeetingAgent } from './meetingAgent';

interface PlatformConfig {
  apiKey: string;
  apiSecret: string;
}

type ProcessingError = Error & {
  code?: string;
  details?: unknown;
};

export class MeetingOrchestrator {
  private platforms: Map<string, PlatformConfig>;
  private agent: MeetingAgent;

  constructor(platformConfig: PlatformConfig) {
    this.platforms = new Map();
    this.platforms.set("default", platformConfig);
    this.agent = new MeetingAgent();
  }

  public async processMeetingRecording(meetingId: string, platform: string): Promise<string> {
    const platformConfig = this.platforms.get(platform);
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const input = `Transcribe meeting ${meetingId} from ${platform} and summarize it.`;

    try {
      const transcription = await this.agent.execute(`transcribeMeeting ${meetingId}`);
      const summary = await this.agent.execute(`summarizeMeeting ${transcription}`);

      return `Transcription: ${transcription}\nSummary: ${summary}`;
    } catch (error) {
      const processingError = error as ProcessingError;
      console.error("Error in processMeetingRecording:", processingError);
      throw new Error("Failed to process meeting recording.");
    }
  }
}