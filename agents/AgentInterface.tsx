export interface Agent {
  id: string;
  name: string;
  performTask: (input: any) => Promise<any>;
  // Additional properties and methods
} 