import { BaseAgent } from './baseAgent';

export class WorkerAgent extends BaseAgent {
  protected actionName: string;

  constructor(actionName: string) {
    super();
    this.actionName = actionName;
  }

  public async execute(input: string): Promise<string> {
    const result = await this.performTask(input);
    return result;
  }

  private async performTask(taskInput: string): Promise<string> {
    // Implement the specific task logic here
    // Placeholder logic:
    return `WorkerAgent performing "${this.actionName}" completed action with input: "${taskInput}"`;
  }
} 