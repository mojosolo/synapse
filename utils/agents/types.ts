import { BaseMessage } from "@langchain/core/messages";
import { AgentStep, AgentFinish } from "@langchain/core/agents";
import { StateGraph } from "@langchain/langgraph";

export interface AgentState {
  messages: BaseMessage[];
  steps: AgentStep[];
  next?: string;
}

export interface WorkflowState {
  input: string;
  agent_outcome?: AgentFinish;
  intermediate_steps: AgentStep[];
}

export type AgentStateGraph = StateGraph<AgentState>;
export type WorkflowStateGraph = StateGraph<WorkflowState>;