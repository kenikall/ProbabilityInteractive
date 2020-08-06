import React, { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './style.module.scss';
import BetterDiceButton from '../BetterDiceButton'
import PipAllocator from '../PipAllocator'
import ResultsTable from '../ResultsTable'
import { betterDice, initializePlayerDice, initializeOpponentDice } from '../helpers'

const cx = classnames.bind(styles);

function ProbababilityPage() {
  const [playerDiceSet, setPlayerDiceSet] = useState({
    four: initializePlayerDice(4),
    six: initializePlayerDice(6),
    eight: initializePlayerDice(8),
    twelve: initializePlayerDice(12),
    twenty: initializePlayerDice(20),
  })
  const [opponentDiceSet, setOpponentDiceSet] = useState({
    four: initializeOpponentDice(4),
    six: initializeOpponentDice(6),
    eight: initializeOpponentDice(8),
    twelve: initializeOpponentDice(12),
    twenty: initializeOpponentDice(20),
  })
  const [activePlayerDice, setActivePlayerDice] = useState('six')
  const [activeOpponentDice, setActiveOpponentDice] = useState('six')
  const [reservePips, setReservePips] = useState(playerDiceSet[activePlayerDice].reservePips)
  const [updateDice, setUpdateDice] = useState(false)

  useEffect(() => {
    setOpponentDiceSet(betterDice(playerDiceSet[activePlayerDice], opponentDiceSet, activeOpponentDice))
    setUpdateDice(false)
  }, [updateDice]);

  return (
    <div>
      <p> {`Reserve Pips for the ${activePlayerDice}-sided dice: ${reservePips}`} </p>
      <BetterDiceButton
        setUpdateDice={setUpdateDice}
        show={activePlayerDice === activeOpponentDice}
      />
      <div className={cx('allocator-container')}>
        <PipAllocator
          setActiveDice={setActivePlayerDice}
          diceSet={playerDiceSet}
          setDiceSet={setPlayerDiceSet}
          setReservePips={setReservePips}
          user={'player'}
        />
        <PipAllocator
          setActiveDice={setActiveOpponentDice}
          diceSet={opponentDiceSet}
          user={'opponent'}
        />
      </div>
      <ResultsTable
        playerDice={playerDiceSet[activePlayerDice]}
        opponentDice={opponentDiceSet[activeOpponentDice]}
      />
    </div>
  )
}

export default ProbababilityPage;
