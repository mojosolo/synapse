import { BaseAgent } from './baseAgent';
import { WorkerAgent } from './WorkerAgent';

export class SupervisorAgent extends BaseAgent {
  protected subtaskName: string;
  protected agents: WorkerAgent[];

  constructor(subtaskName: string) {
    super();
    this.subtaskName = subtaskName;
    this.agents = this.initializeAgents();
  }

  private initializeAgents(): WorkerAgent[] {
    return [
      new WorkerAgent(`${this.subtaskName} Action 1`),
      new WorkerAgent(`${this.subtaskName} Action 2`),
      new WorkerAgent(`${this.subtaskName} Action 3`),
    ];
  }

  public async execute(input: string): Promise<string> {
    const results = await Promise.all(
      this.agents.map(agent => agent.execute(input))
    );
    return `SupervisorAgent (${this.subtaskName}) executed.\nResults:\n${results.join('\n')}`;
  }
} 