import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './style.module.scss';
import AllocationButtons from '../AllocationButtons';

const cx = classnames.bind(styles);

const propTypes = {
  diceName: PropTypes.oneOf(['four', 'six', 'eight', 'twelve', 'twenty']).isRequired,
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
  setDiceSet: () => null,
  setReservePips: () => null,
};

function Dice({
  diceName,
  diceSet,
  setDiceSet,
  setReservePips,
  user,
}){
  const faceCount = {
    four: 4,
    six: 6,
    eight: 8,
    twelve: 12,
    twenty: 20,
  }
  const [active, setActive] = useState(null)
  const [faces, setFaces] = useState([
    {faceName: "oneFace", faceNumber: 1},
    {faceName: "twoFace", faceNumber: 2},
    {faceName: "threeFace", faceNumber: 3},
    {faceName: "fourFace", faceNumber: 4, breakLoop: 'four'},
    {faceName: "fiveFace", faceNumber: 5},
    {faceName: "sixFace", faceNumber: 6, breakLoop: 'six'},
    {faceName: "sevenFace", faceNumber: 7},
    {faceName: "eightFace", faceNumber: 8, breakLoop: 'eight'},
    {faceName: "nineFace", faceNumber: 9},
    {faceName: "tenFace", faceNumber: 10},
    {faceName: "elevenFace", faceNumber: 11},
    {faceName: "twelveFace", faceNumber: 12, breakLoop: 'twelve'},
    {faceName: "thirteenFace", faceNumber: 13},
    {faceName: "fourteenFace", faceNumber: 14},
    {faceName: "fifteenFace", faceNumber: 15},
    {faceName: "sixteenFace", faceNumber: 16},
    {faceName: "seventeenFace", faceNumber: 17},
    {faceName: "eighteenFace", faceNumber: 18},
    {faceName: "nineteenFace", faceNumber: 19},
    {faceName: "twentyFace", faceNumber: 20, breakLoop: 'twenty'},
  ])

  return(
    <div
      className={cx("dice-selector", diceName)}
    >
      {faces.slice(0, faceCount[diceName]).map((face) => {
        return(
          <div
            key={face.faceName}
            className={cx(
              "dice-face",
              face.faceName,
              user
            )}
            onMouseEnter={() => setActive(face.faceNumber)}
            onMouseLeave={() => setActive(null)}
          >
            <div>
              <AllocationButtons
                active={active === face.faceNumber}
                diceName={diceName}
                face={face.faceName}
                diceSet={diceSet}
                setDiceSet={setDiceSet}
                setReservePips={setReservePips}
              />
              {diceSet[diceName][face.faceName]}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Dice.defaultProps = defaultProps;
Dice.propTypes = propTypes;

export default Dice;
