import {pipeline} from '@xenova/transformers';

class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      this.instance = pipeline(task, model, {progressCallback});
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const extractor = await EmbeddingPipeline.getInstance((x) => {
    self.postMessage(x);
  });

  const output = await extractor(event.data.text, {
    pooling: 'mean',
    normalize: true,
  });

  self.postMessage({
    status: 'complete',
    output: output,
  });
});
