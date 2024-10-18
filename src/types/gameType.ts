type Game = {
  name: null | string,
  playerColor: null | string,
  computerColor: null | string,
  computerScoreValue: number,
  playerScoreValue: number,
  round: number,
  isFirstGame: boolean,
  isColorChanged: boolean
  [key: string]: null | string | number | boolean
}
