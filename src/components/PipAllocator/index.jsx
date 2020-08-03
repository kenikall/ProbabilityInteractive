import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import fourDiceIcon from './images/4_dice_icon.png';
import sixDiceIcon from './images/6_dice_icon.png';
import eightDiceIcon from './images/8_dice_icon.png';
import twelveDiceIcon from './images/12_dice_icon.png';
import twentyDiceIcon from './images/20_dice_icon.png';

import Dice from '../Dice';
import styles from './style.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
  setActiveDice:  PropTypes.func,
  diceSet: PropTypes.shape({
    four: PropTypes.object,
    six: PropTypes.object,
    eight: PropTypes.object,
    twelve: PropTypes.object,
    twenty: PropTypes.object,
  }).isRequired,
  setDiceSet:  PropTypes.func,
  setReservePips: PropTypes.func,
  user: PropTypes.oneOf(['player', 'opponent']).isRequired
};

const defaultProps = {
  setActiveDice: () => null,
  setDiceSet: () => null,
  setReservePips: () => null,
};

function PipAllocator({
  setActiveDice,
  diceSet,
  setDiceSet,
  setReservePips,
  user
}) {
  const [selected, setSelected] = useState(6)
  const [position, setPosition] = useState(-550)
  const icons = [
    {src: fourDiceIcon, name: 'four', number: 4, position: 0},
    {src: sixDiceIcon, name: 'six', number: 6, position: -550},
    {src: eightDiceIcon, name: 'eight', number: 8, position: -1100},
    {src: twelveDiceIcon, name: 'twelve', number: 12, position: -1650},
    {src: twentyDiceIcon, name: 'twenty', number: 20, position: -2200},
  ]

  return(
    <span className={cx("container")}>
      <div className={cx("dice-selector")}>
        {icons.map((icon) =>{
          return(
            <div
              key={`${icon.number}-selector`}
              className={cx(
                user,
                {selected: selected === icon.number}
              )}
              onClick={() =>{
                setTimeout(() => {setPosition(icon.position)}, 500)
                setReservePips(diceSet[icon.name].reservePips)
                setSelected(icon.number)
                setActiveDice(icon.name)
              }}
            >
              <img src={icon.src} alt={`${icon.number} sided dice`} />
            </div>
          )
        })}
      </div>

      <div className={cx("allocation-window")}>
        <div
          style={{left: position}}
          className={cx(
            "initializeRow",
            {
              show4sidedDice: selected === 4,
              show6sidedDice: selected === 6,
              show8sidedDice: selected === 8,
              show12sidedDice: selected === 12,
              show20sidedDice: selected === 20,
            }
          )}
        >
          {icons.map((icon) => {
            return(
              <Dice
                key={icon.name}
                diceSet={diceSet}
                diceName={icon.name}
                setDiceSet={setDiceSet}
                setReservePips={setReservePips}
                user={user}
              />
            )
          })}
        </div>
      </div>
    </span>
  )
}

PipAllocator.defaultProps = defaultProps;
PipAllocator.propTypes = propTypes;

export default PipAllocator;
