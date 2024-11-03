import { BaseAgent } from './baseAgent';
import { DirectorAgent } from './DirectorAgent';

export class ChiefAgent extends BaseAgent {
  protected domain: string;
  protected directors: DirectorAgent[];

  constructor(domain: string) {
    super();
    this.domain = domain;
    this.directors = this.initializeDirectors();
  }

  private initializeDirectors(): DirectorAgent[] {
    return [
      new DirectorAgent(`${this.domain} Module 1`),
      new DirectorAgent(`${this.domain} Module 2`),
      new DirectorAgent(`${this.domain} Module 3`),
    ];
  }

  public async execute(input: string): Promise<string> {
    const results = await Promise.all(
      this.directors.map(agent => agent.execute(input))
    );
    return `ChiefAgent (${this.domain}) executed.\nResults:\n${results.join('\n')}`;
  }
} 