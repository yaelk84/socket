export enum State {
  AllGame = 'AllGames',
  ChosenGame = 'ChosenGame',
  Question = 'Question',
  Next = 'Next',
  GameOver = 'GameOver'
}

export interface Question {
  q1:string
  a:string[],
  correct: string;
  playersInGame:number
}

export interface Question {
  q1:string
  a:string[],
  correct: string;
  playersInGame:number
}

export interface Player {
  pin:string
  name:string,
  gameData: GameData;
  playersInGame:number;
  accessories:Accessories;

}
export interface GameData {
  score:Number;
  answer:string
}

export interface Accessories {
  shirt:string;
  glasses :string;
  gender:string;
  items:string;
}
