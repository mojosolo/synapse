export abstract class Layer {
  abstract process(input: any): Promise<any>;
} 