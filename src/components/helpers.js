export const faceNames = [
  null,
  'oneFace', 'twoFace',
  'threeFace', 'fourFace',
  'fiveFace', 'sixFace',
  'sevenFace', 'eightFace',
  'nineFace', 'tenFace',
  'elevenFace', 'twelveFace',
  'thirteenFace', 'fourteenFace',
  'fifteenFace', 'sixteenFace',
  'seventeenFace', 'eighteenFace',
  'nineteenFace', 'twentyFace'
]

function totalPips(faces){
  return (faces + 1) * faces/2
}

export function initializePlayerDice(faces){
    let dice = {
      totalPips: totalPips(faces),
      reservePips: 0,
    }

    for(let i = 1; i <= faces; i++){
      dice[faceNames[i]] = i
    }
    return dice
  }

export function initializeOpponentDice(faces){
  let remainingPips = totalPips(faces)
  let dice = {}

  for(let i = 1; i < faces; i++){
    dice[faceNames[i]] = Math.floor((Math.random() * remainingPips))
    remainingPips -= dice[faceNames[i]]
  }

  dice[faceNames[faces]] = remainingPips
  return dice
}

export function diceValues(dice){
  let values = []

  faceNames.forEach((face) =>{
    if(face && dice[face] !== undefined){
      values.push(dice[face])
    }
  })

  return values.sort((a,b) => a-b)
}
