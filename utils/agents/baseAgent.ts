import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentState, WorkflowState } from "./types";
import { StateGraph } from "@langchain/langgraph";

export class BaseAgent {
  protected model: ChatOpenAI;
  protected tools: DynamicStructuredTool[];
  protected executor: AgentExecutor;
  
  constructor() {
    this.model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0,
    });
    this.tools = [];
    this.initializeTools();
  }

  protected initializeTools() {
    // Override in child classes to add specific tools
  }

  protected async createExecutor() {
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
    if (!this.executor) {
      await this.createExecutor();
    }
    const result = await this.executor.invoke({ input });
    return result.output;
  }

  protected createWorkflow(): StateGraph<WorkflowState> {
    const workflow = new StateGraph<WorkflowState>({
      channels: ["input", "agent_outcome", "intermediate_steps"]
    });

    workflow.addNode("agent", async (state: WorkflowState) => {
      const result = await this.execute(state.input);
      return {
        ...state,
        agent_outcome: result
      };
    });

    workflow.setEntryPoint("agent");
    
    return workflow;
  }
}