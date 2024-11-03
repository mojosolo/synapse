import { BaseAgent } from './baseAgent';
import { ManagerAgent } from './ManagerAgent';
import { BrainExtractorAgent } from './BrainExtractorAgent';

export class DirectorAgent extends BaseAgent {
  protected moduleName: string;
  protected managers: ManagerAgent[];

  constructor(moduleName: string) {
    super();
    this.moduleName = moduleName;
    this.managers = this.initializeManagers();
  }

  private initializeManagers(): ManagerAgent[] {
    if (this.moduleName === 'Knowledge Module 1') {
      return [
        new ManagerAgent(`Brain Extraction`, new BrainExtractorAgent()),
        new ManagerAgent(`${this.moduleName} Task 1`),
        new ManagerAgent(`${this.moduleName} Task 2`),
        new ManagerAgent(`${this.moduleName} Task 3`),
      ];
    }
    return [
      new ManagerAgent(`${this.moduleName} Task 1`),
      new ManagerAgent(`${this.moduleName} Task 2`),
      new ManagerAgent(`${this.moduleName} Task 3`),
    ];
  }

  public async execute(input: string): Promise<string> {
    const results = await Promise.all(
      this.managers.map(agent => agent.execute(input))
    );
    return `DirectorAgent (${this.moduleName}) executed.\nResults:\n${results.join('\n')}`;
  }
} 