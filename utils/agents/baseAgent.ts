import type { ChatOpenAI } from "@langchain/openai";
import type { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import type { DynamicStructuredTool } from "@langchain/core/tools";
import type { StateGraph } from "@langchain/langgraph";
import type { AgentState, WorkflowState } from "./types";
import { NeuralNetwork } from './NeuralNetwork';
import { ReflectLayer } from './ReflectLayer';
import { ThinkLayer } from './ThinkLayer';
import { PlanLayer } from './PlanLayer';
import { embedProverb } from '../helpers/ProverbHelper';

export class BaseAgent {
  protected model: ChatOpenAI;
  protected tools: DynamicStructuredTool[];
  protected executor: AgentExecutor | null;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: "gpt4o-mini",
      temperature: 0,
    });
    console.log(`BaseAgent initialized with model: ${this.model.modelName}`);
    this.tools = [];
    this.executor = null;
    this.initializeTools();
  }

  protected initializeTools(): void {
    // Optional, to be overridden by child classes
  }

  public async execute(input: string): Promise<string> {
    // Default implementation, should be overridden by child classes
    throw new Error('Execute method not implemented.');
  }
}