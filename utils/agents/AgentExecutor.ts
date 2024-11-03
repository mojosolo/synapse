import { BaseAgent } from './baseAgent';
import { ChiefAgent } from './ChiefAgent';

export class AgentExecutor extends BaseAgent {
  protected chiefAgents: ChiefAgent[];

  constructor() {
    super();
    this.chiefAgents = this.initializeChiefAgents();
  }

  private initializeChiefAgents(): ChiefAgent[] {
    return [
      new ChiefAgent('Knowledge'),
      new ChiefAgent('Decision'),
      new ChiefAgent('Operational'),
    ];
  }

  public async execute(input: string): Promise<string> {
    const results = await Promise.all(
      this.chiefAgents.map(agent => agent.execute(input))
    );
    return `AgentExecutor completed execution.\nResults:\n${results.join('\n')}`;
  }
} 