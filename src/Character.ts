import Fighter from './Fighter';
import Race from './Races/index';
import Archetype from './Archetypes/index';
import Energy from './Energy';
import getRandomInt from './utils';
import Elf from './Races/Elf';
import Mage from './Archetypes/Mage';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType, 
      amount: getRandomInt(1, 10),
    };
  }

  public get race(): Race { return this._race; }
  public get archetype(): Archetype { return this._archetype; }
  public get lifePoints(): number { return this._lifePoints; }
  public get strength(): number { return this._strength; }
  public get defense(): number { return this._defense; }
  public get dexterity(): number { return this._dexterity; }
  public get energy(): Energy { return { ...this._energy }; }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) { 
      this._lifePoints -= damage; 
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) { this._lifePoints = -1; }
    return this._lifePoints;
  }

  attack(enemy: Fighter): void { 
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;

    const upLife = this._maxLifePoints + getRandomInt(1, 10);
    if (upLife > this._race.maxLifePoints) { 
      this._maxLifePoints = this.race.maxLifePoints;
      this._lifePoints = this.race.maxLifePoints;
    } else {
      this._maxLifePoints = upLife;
      this._lifePoints = upLife;
    }
  }

  // special?(enemy: Fighter): void {
  //   const damage = enemy.lifePoints - this._strength;
  //   return damage;
  // }
}