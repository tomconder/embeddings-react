import PropTypes from 'prop-types';

export default function Progress({text, percentage}) {
  percentage = percentage ?? 0;
  return (
    <div className="progress-container">
      <div className='progress-bar' style={{'width': `${percentage}%`}}>
        {text} ({`${percentage.toFixed(2)}%`})
      </div>
    </div>
  );
}

Progress.propTypes = {
  text: PropTypes.any,
  percentage: PropTypes.any,
};

