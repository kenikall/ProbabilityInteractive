import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
};

const defaultProps = {
};

function BetterDiceButton({
  setUpdateDice,
  show,
}){
  return(
    <button
      className={cx(
        'better-dice_button',
        {'show-button': show}
      )}
      onClick={() => {
        setUpdateDice(true)
      }}
    >
      Reallocate Opponent Dice
    </button>
  )
}

BetterDiceButton.defaultProps = defaultProps;
BetterDiceButton.propTypes = propTypes;

export default BetterDiceButton;
