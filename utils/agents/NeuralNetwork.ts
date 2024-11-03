export class NeuralNetwork {
  private layers: Layer[];

  constructor() {
    this.layers = [];
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
  }

  async process(input: any): Promise<any> {
    let output = input;
    for (const layer of this.layers) {
      output = await layer.process(output);
    }
    return output;
  }
} 