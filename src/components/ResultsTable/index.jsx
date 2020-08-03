import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './style.module.scss';
import { diceValues } from '../helpers'

const cx = classnames.bind(styles);

const propTypes = {
};

const defaultProps = {
};

function ResultsTable({playerDice, opponentDice}) {
  const playerValues = diceValues(playerDice)
  const opponentValues = diceValues(opponentDice)

  let score = {
    player: 0,
    opponent: 0,
    draw: 0,
  }

  return (
    <div className={cx('container')}>
      <table>
        <thead>
          <tr>
            <td/>
            {opponentValues.map((value, index) => {
              return(
                <td
                  key={`opponent-label-${index}`}
                  className={cx("label", "opponent-label")}
                >
                  { value }
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {playerValues.map((playerValue, xVal) => {
            return(
              <tr key={`player-row-${xVal}`}>
                <td className={cx("label", "player-label")}>{playerValue}</td>
                {opponentValues.map((opponentValue, yVal) => {
                  if(playerValue > opponentValue){score.player++}
                  else if(opponentValue > playerValue){score.opponent++}
                  else{score.draw++}

                  return(
                    <td
                      key={`cell-(${xVal}, ${yVal})`}
                      className={
                        cx("cell",
                          {
                            player: playerValue > opponentValue,
                            opponent: opponentValue > playerValue,
                          }
                        )
                      }
                    ></td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <table className={cx('tally')}>
        <tbody>
          <tr>
            <td className={cx("cell", "player")}/>
            <td className={cx("cell", "opponent")}/>
            <td className={cx("cell")}/>
          </tr>
          <tr>
            <td className={cx("label")}>{score.player}</td>
            <td className={cx("label")}>{score.opponent}</td>
            <td className={cx("label")}>{score.draw}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ResultsTable.defaultProps = defaultProps;
ResultsTable.propTypes = propTypes;

export default ResultsTable;
