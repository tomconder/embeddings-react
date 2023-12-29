import {useState} from 'react';
import CalculateButton from '../components/CalculateButton/CalculateButton';
import ResultsBox from '../components/ResultsBox/ResultsBox';
import styles from './MainContainer.module.css';
import {pipeline} from '@xenova/transformers';

class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      this.instance =
        pipeline(`${this.task}`, `${this.model}`, {progressCallback});
    }
    return this.instance;
  }
}

const MainContainer = () => {
  const [disabled, setDisabled] = useState(false);

  const [input1, setInput1] = useState('This is a happy person');
  const [input2, setInput2] = useState('This is a happy person');
  const [output, setOutput] = useState('');

  let extractor = null;

  const dotProduct = (a, b) => {
    if (a.length !== b.length) {
      throw new Error('Both arguments must have the same length');
    }

    let result = 0;

    for (let i = 0; i < a.length; i++) {
      result += a[i] * b[i];
    }

    return result;
  };

  const calculateSimilarity = async () => {
    setDisabled(true);

    if (extractor === null) {
      extractor = await EmbeddingPipeline.getInstance((x) => {
        self.postMessage(x);
      });
    }

    const output1 = extractor(input1, {pooling: 'mean', normalize: true})
        .then((response) => console.log(response));
    const output2 = await extractor(input2, {pooling: 'mean', normalize: true});

    const output = dotProduct(output1.data, output2.data);
    setOutput(output);
    setDisabled(false);
  };

  return (
    <>
      <h1>Generate embeddings in the browser</h1>

      <div className={styles.inputs}>
        <textarea
          value={input1}
          id="input1"
          onChange={(x) => setInput1(x.target.value)}>
        </textarea>
        <textarea
          value={input2}
          id="input2"
          onChange={(x) => setInput2(x.target.value)}>
        </textarea>
      </div>

      <CalculateButton disabled={disabled} onClick={calculateSimilarity} />
      <ResultsBox>{ output }</ResultsBox>
    </>
  );
};

MainContainer.propTypes = {};

MainContainer.defaultProps = {};

export default MainContainer;
