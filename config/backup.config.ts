interface BackupConfig {
  intervals: {
    daily: {
      retention: number;
      time: string;
    };
    weekly: {
      retention: number;
      day: string;
    };
    monthly: {
      retention: number;
      date: number;
    };
    annual: {
      retention: number;
      month: number;
      date: number;
    };
  };
  paths: {
    local: string;
    cloud: string;
  };
  notifications: {
    email: string[];
    slack?: string;
  };
}

const backupConfig: BackupConfig = {
  intervals: {
    daily: {
      retention: 7, // days
      time: "00:00"
    },
    weekly: {
      retention: 4, // weeks
      day: "Sunday"
    },
    monthly: {
      retention: 12, // months
      date: 1
    },
    annual: {
      retention: -1, // infinite retention
      month: 0, // January
      date: 1
    }
  },
  paths: {
    local: "/backups/docs",
    cloud: "s3://your-bucket/backups/docs"
  },
  notifications: {
    email: ["master.librarian@your-domain.com"],
    slack: "webhook-url-for-notifications"
  }
};

export default backupConfig; 