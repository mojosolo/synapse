import { ResearchAgent } from "./researchAgent";

export type AgentType = "research" | "analysis" | "coding";

export class AgentFactory {
  private static instances: Map<AgentType, BaseAgent> = new Map();

  public static createAgent(type: AgentType): BaseAgent {
    if (!this.instances.has(type)) {
      switch (type) {
        case "research":
          this.instances.set(type, new ResearchAgent());
          break;
        // Add other agent types here
        default:
          throw new Error(`Unknown agent type: ${type}`);
      }
    }
    return this.instances.get(type)!;
  }
}