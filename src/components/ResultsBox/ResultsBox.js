import PropTypes from 'prop-types';
import styles from './ResultsBox.module.css';

const ResultsBox = ({children}) => (
  <div className={styles.output}>
    {children}
  </div>
);

ResultsBox.propTypes = {
  children: PropTypes.any,
};

ResultsBox.defaultProps = {};

export default ResultsBox;
