/**
 * @typedef {Object} CombatHistory
 * @property {wins} number - Number of victories
 * @property {loses} number - Number of defeats
 */

/**
 * @typedef {Object} Stats
 * @property {string} name - The name of fighter
 * @property {number} attack - The amount of attack of fighter
 * @property {number} hp - The total number of health point of fighter
 */

/**
 * @typedef {Object} Fighter
 * @property {function} getName - Return name of the fighter
 * @property {function} fight - Return true if fighter make dmg to enemy, otherwise false
 * @property {function} block - Return true if enemy can block incoming damage, otherwise false (randomly)
 * @property {function} getStats - Retrurn {Stats} of fighter
 * @property {number} getCombatHistory - Return {CombatHistory} of previous fights
 */

/**
 * Pretty print fighter's info
 * @param {Fighter} fighter - The fighter
 * DO NOT MODIFY
 */
function showResult(fighter) {
  console.log('Fighter', fighter.getName());
  console.log('- Combat stats:', fighter.getCombatHistory());
  console.log('- Properties:', fighter.getStats());
}



const DEF_NAME = "Johndou";
const DEF_ATTACK = 20;
const DEF_HP = 100;

function fighter(stats) {
  // Creating own stats object to preventing rewrite stats of fighter from previous object
  if (!stats) {
    stats = {};
  }

  stats = {
    name: stats.name || DEF_NAME,
    attack: stats.attack || DEF_ATTACK,
    hp: stats.hp || DEF_HP,
  };

  let combatHistory = {
    wins: 0,
    loses: 0
  };

  return {
    getName: function () {
      return stats.name;
    },

    fight: function (enemy) {
      if (!enemy) {
        return undefined;
      }
      if (enemy.block()) {
        return false;
      }
      if ((enemy.getStats().hp -= stats.attack) <= 0) {
        combatHistory.wins++;
        enemy.getCombatHistory().loses++;
      }
      return true;
    },

    block: function () {
      return Math.trunc(Math.random() + 0.5) == true;
    },

    getStats: function () {
      return stats;
    },

    getCombatHistory: function () {
      return combatHistory;
    }
  };
}

/**
 * The following code must be valid after implementation!
 */

var fighter1 = fighter({ name: 'John', attack: 100, hp: 100 });
var fighter2 = fighter({ name: 'Kayn', attack: 50, hp: 300 });
var fighter3 = fighter({ name: 'Bill', attack: 40, hp: 100 });

console.log(fighter1.fight(fighter2));
console.log(fighter1.fight(fighter3));

showResult(fighter1);
showResult(fighter2);
showResult(fighter3);
