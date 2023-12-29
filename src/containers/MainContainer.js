import React from 'react';
import CalculateButton from '../components/CalculateButton/CalculateButton';
import ResultsBox from '../components/ResultsBox/ResultsBox';
import styles from './MainContainer.module.css';

const MainContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
        .then((response) => {
          console.log('response', response);
          setData(response);
        })
        .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    console.log('data', data);
  }, [data]);

  return (
    <>
      <h1>Generate embeddings in the browser</h1>

      <div className={styles.inputs}>
        <textarea id="input1">That is a happy person</textarea>
        <textarea id="input2">That is a happy person</textarea>
      </div>

      <CalculateButton disabled={isLoading} />
      <ResultsBox></ResultsBox>

    </>
  );
};

MainContainer.propTypes = {};

MainContainer.defaultProps = {};

export default MainContainer;
