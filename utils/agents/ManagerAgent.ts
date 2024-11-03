import { BaseAgent } from './baseAgent';
import { SupervisorAgent } from './SupervisorAgent';
import { BaseAgent as SpecificBaseAgent } from './baseAgent';

export class ManagerAgent extends BaseAgent {
  protected taskName: string;
  protected supervisors: SupervisorAgent[];
  protected specificAgent: SpecificBaseAgent | null;

  constructor(taskName: string, specificAgent?: SpecificBaseAgent) {
    super();
    this.taskName = taskName;
    this.specificAgent = specificAgent || null;
    this.supervisors = this.initializeSupervisors();
  }

  private initializeSupervisors(): SupervisorAgent[] {
    if (this.specificAgent) {
      return [];
    }
    return [
      new SupervisorAgent(`${this.taskName} Subtask 1`),
      new SupervisorAgent(`${this.taskName} Subtask 2`),
      new SupervisorAgent(`${this.taskName} Subtask 3`),
    ];
  }

  public async execute(input: string): Promise<string> {
    if (this.specificAgent) {
      return await this.specificAgent.execute(input);
    }
    const results = await Promise.all(
      this.supervisors.map(agent => agent.execute(input))
    );
    return `ManagerAgent (${this.taskName}) executed.\nResults:\n${results.join('\n')}`;
  }
} 