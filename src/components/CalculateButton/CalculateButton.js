import styles from './CalculateButton.module.css';

const CalculateButton = (props) => (
  <button id="generate-button" className={styles.calculate} { ...props }>
  Calculate Similarity
  </button>
);

CalculateButton.propTypes = {};

CalculateButton.defaultProps = {};

export default CalculateButton;
