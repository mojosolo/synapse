export interface MeetingPlatformConfig {
  apiKey: string;
  apiSecret?: string;
  region?: string;
}

export abstract class BaseMeetingPlatform {
  protected config: MeetingPlatformConfig;

  constructor(config: MeetingPlatformConfig) {
    this.config = config;
  }

  abstract createMeeting(params: {
    title: string;
    duration: number;
    participants: string[];
  }): Promise<{ meetingId: string; joinUrl: string }>;

  abstract getMeetingRecording(meetingId: string): Promise<string>;
  
  abstract endMeeting(meetingId: string): Promise<void>;
}