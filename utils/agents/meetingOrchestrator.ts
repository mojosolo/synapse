import { MeetingAgent } from './meetingAgent';
import { ZoomPlatform, TeamsPlatform } from './meetingPlatforms';
import { MeetingPlatformConfig } from './meetingPlatforms/basePlatform';

export class MeetingOrchestrator {
  private agent: MeetingAgent;
  private platforms: Map<string, ZoomPlatform | TeamsPlatform>;

  constructor(platformConfigs: Record<string, MeetingPlatformConfig>) {
    this.agent = new MeetingAgent();
    this.platforms = new Map();

    if (platformConfigs.zoom) {
      this.platforms.set('zoom', new ZoomPlatform(platformConfigs.zoom));
    }
    if (platformConfigs.teams) {
      this.platforms.set('teams', new TeamsPlatform(platformConfigs.teams));
    }
  }

  async scheduleMeeting(params: {
    title: string;
    duration: number;
    participants: string[];
    platform: string;
    transcribe?: boolean;
    summarize?: boolean;
  }) {
    const platform = this.platforms.get(params.platform);
    if (!platform) {
      throw new Error(`Unsupported platform: ${params.platform}`);
    }

    // Create meeting
    const { meetingId, joinUrl } = await platform.createMeeting({
      title: params.title,
      duration: params.duration,
      participants: params.participants
    });

    // Setup post-meeting processing
    if (params.transcribe || params.summarize) {
      this.agent.processMeeting(meetingId, {
        transcribe: params.transcribe,
        summarize: params.summarize
      });
    }

    return { meetingId, joinUrl };
  }

  async processMeetingRecording(meetingId: string, platform: string) {
    const platformInstance = this.platforms.get(platform);
    if (!platformInstance) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const recordingUrl = await platformInstance.getMeetingRecording(meetingId);
    return this.agent.processMeeting(meetingId, {
      transcribe: true,
      summarize: true,
      format: 'detailed'
    });
  }
}