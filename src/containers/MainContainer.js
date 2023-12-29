import {useEffect, useRef, useState} from 'react';
import CalculateButton from '../components/CalculateButton/CalculateButton';
import ResultsBox from '../components/ResultsBox/ResultsBox';
import Progress from '../components/Progress';
import styles from './MainContainer.module.css';

const MainContainer = () => {
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);

  const [input1, setInput1] = useState('This is a happy person');
  const [input2, setInput2] = useState('This is a happy person');
  const [output, setOutput] = useState('');

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../worker.js', import.meta.url), {
        type: 'module',
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems((prev) => [...prev, e.data]);
          break;

        case 'progress':
          // Model file progress: update one of the progress items.
          setProgressItems(
              (prev) => prev.map((item) => {
                if (item.file === e.data.file) {
                  return {...item, progress: e.data.progress};
                }
                return item;
              }),
          );
          break;

        case 'done':
          // Model file loaded: remove the progress item from the list.
          setProgressItems(
              (prev) => prev.filter((item) => item.file !== e.data.file),
          );
          break;

        case 'ready':
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;

        case 'update':
          // Generation update: update the output text.
          setOutput(e.data.output);
          break;

        case 'complete':
          // Generation complete: re-enable the "Translate" button
          setDisabled(false);
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener('message', onMessageReceived);
  });

  const calculateSimilarity = () => {
    setDisabled(true);
    worker.current.postMessage({
      input1,
      input2,
    });
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

      <div className='progress-bars-container'>
        {ready === false && (
          <span>Loading models... (only run once)</span>
        )}
        {progressItems.map((data) => (
          <div key={data.file}>
            <Progress text={data.file} percentage={data.progress} />
          </div>
        ))}
      </div>

    </>
  );
};

MainContainer.propTypes = {};

MainContainer.defaultProps = {};

export default MainContainer;
