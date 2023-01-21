import Battle from './Battle';
import Fighter from '../Fighter/index';

export default class PVP extends Battle {
  private _player1: Fighter;
  private _player2: Fighter;
  
  constructor(player1: Fighter, player2: Fighter) {
    super(player1);
    this._player1 = player1;
    this._player2 = player2;
  }

  fight(): number {
    if (this._player1.lifePoints > 0 || this._player2.lifePoints > 0) {
      this._player1.attack(this._player2);
      this._player2.attack(this._player1);
    }
    console.log(this._player1.lifePoints);
    
    return super.fight();
  }
}