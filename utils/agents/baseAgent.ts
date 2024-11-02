import type { ChatOpenAI } from "@langchain/openai";
import type { AgentExecutor } from "langchain/agents";
import type { DynamicStructuredTool } from "@langchain/core/tools";
import type { StateGraph } from "@langchain/langgraph";
import type { AgentState, WorkflowState } from "./types";

export class BaseAgent {
  protected model: ChatOpenAI;
  protected tools: DynamicStructuredTool[];
  protected executor: AgentExecutor | null;

  constructor() {
    // We'll need to ensure these packages are installed via package.json
    const { ChatOpenAI } = require("@langchain/openai");
    
    this.model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
    });
    this.tools = [];
    this.executor = null;
    this.initializeTools();
  }

  protected initializeTools(): void {
    // To be overridden by child classes
  }

  protected async createExecutor(): Promise<void> {
    const { createOpenAIFunctionsAgent, AgentExecutor } = require("langchain/agents");
    
    const agent = await createOpenAIFunctionsAgent({
      llm: this.model,
      tools: this.tools,
    });

    this.executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools: this.tools,
      verbose: true,
    });
  }

  public async execute(input: string): Promise<string> {
    try {
      if (!this.executor) {
        await this.createExecutor();
      }
      const result = await this.executor!.invoke({ input });
      return result.output as string;
    } catch (error) {
      console.error("Execution Error:", error);
      throw new Error("Failed to execute agent.");
    }
  }

  protected createWorkflow(): StateGraph<WorkflowState> {
    const { StateGraph } = require("@langchain/langgraph");
    
    const workflow = new StateGraph<WorkflowState>({
      channels: ["input", "agent_outcome", "intermediate_steps"],
    });

    workflow.addNode("agent", async (state: WorkflowState) => {
      const result = await this.execute(state.input);
      return {
        ...state,
        agent_outcome: result,
      };
    });

    workflow.setEntryPoint("agent");

    return workflow;
  }
}