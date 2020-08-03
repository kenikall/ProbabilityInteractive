import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
  active: PropTypes.bool,
  diceName: PropTypes.oneOf(['four', 'six', 'eight', 'twelve', 'twenty']).isRequired,
  face: PropTypes.oneOf([  'oneFace', 'twoFace', 'threeFace', 'fourFace', 'fiveFace',
    'sixFace', 'sevenFace', 'eightFace', 'nineFace', 'tenFace',
    'elevenFace', 'twelveFace', 'thirteenFace', 'fourteenFace',
    'fifteenFace', 'sixteenFace', 'seventeenFace', 'eighteenFace',
    'nineteenFace', 'twentyFace'
  ]).isRequired,
  diceSet: PropTypes.shape({
    four: PropTypes.object,
    six: PropTypes.object,
    eight: PropTypes.object,
    twelve: PropTypes.object,
    twenty: PropTypes.object,
  }).isRequired,
  setDiceSet: PropTypes.func,
  setReservePips: PropTypes.func,
};

const defaultProps = {
  active: false,
  setDiceSet: () => null,
  setReservePips: () => null,
};

function AlocationButtons({
  active,
  diceName,
  face,
  diceSet,
  setDiceSet,
  setReservePips,
}) {
  let currentDiceSet = diceSet

  return(
    <div className={
      cx(
        "button-container",
        {visible: active}
      )
    }>
      <button
        className={
          cx("button", "subtract",
            {visible:
              active
              && currentDiceSet[diceName].reservePips !== currentDiceSet[diceName].totalPips
              && currentDiceSet[diceName][face] !== 0
            }
          )
        }
        onClick={() => {
          currentDiceSet[diceName][face] -= 1
          currentDiceSet[diceName].reservePips += 1
          setReservePips(currentDiceSet[diceName].reservePips)
          setDiceSet(currentDiceSet)
        }}
      >
        -
      </button>
      <button
        className={cx("button", "plus", {visible: active && currentDiceSet[diceName].reservePips > 0 })}
        onClick={() => {
          currentDiceSet[diceName][face] += 1
          currentDiceSet[diceName].reservePips -= 1
          setReservePips(currentDiceSet[diceName].reservePips)
          setDiceSet(currentDiceSet)
        }}
      >
        +
      </button>
    </div>
  )
}

AlocationButtons.defaultProps = defaultProps;
AlocationButtons.propTypes = propTypes;

export default AlocationButtons;
