function assign(extendedObject, ...objects) {
    for (let i = 0; i < objects.length; ++i) {
        for (let key in objects[i]) {
            if (objects[i].hasOwnProperty(key)) {
                let descriptor = Object.getOwnPropertyDescriptor(objects[i], key);
                Object.defineProperty(extendedObject, key, descriptor);
            }
        }
    }
    return extendedObject;
}

var defaults = { width: 100, height: 100 };
var options = {
    width: 150,
    set name(value) {
        this.width = value + " value";
    },
    get name() {
        return this.width;
    }
};

var configs = assign({}, defaults, options);
console.log(configs);

configs.name = "Another";
console.log(configs);




// CREATURE
let Creature = (function () {

    // default constant
    const REG_EX_CORRECT_NAME = /^[a-zA-Z _]+$/;
    const DEFAULT_NAME = "Unknown creature";
    const DEFAULT_ATTACK = 5;
    const DEFAULT_HITPOINTS = 50;

    // field for private properties
    let privateData = new WeakMap();

    // constructor
    function Creature(config) {

        // prepare object with private properties
        let props = {};

        // checks for config object's properties and if need converts to valid type
        props.name = (REG_EX_CORRECT_NAME.test(config["name"])) ? config["name"].toString() : DEFAULT_NAME;
        props.attack = (Number.isSafeInteger(config["attack"]) && (config["attack"] >= 0)) ? config["attack"] : DEFAULT_ATTACK;
        props.totalHitpoints = (Number.isSafeInteger(config["hitpoints"]) && (config["hitpoints"] > 0)) ? config["hitpoints"] : DEFAULT_HITPOINTS;
        props.currentHitpoints = props.totalHitpoints;
        props._totalWins = 0;
        props._totalLoses = 0;

        // add props object to privateData store field; .this is key
        privateData.set(this, props);
    }

    // public methods
    // getter for name
    Creature.prototype.getName = function () {
        return privateData.get(this).name;
    };
    // getter for win's count
    Creature.prototype.getHitpoints = function () {
        return privateData.get(this)._totalWins;
    };

    // getter for lose's count
    Creature.prototype.getHitpoints = function () {
        return privateData.get(this)._totalLoses;
    };

    // getter for currentHitpoints
    Creature.prototype.getHitpoints = function () {
        return privateData.get(this).currentHitpoints;
    };

    // setter for currentHitpoints
    Creature.prototype.setHitpoints = function (value) {
        if (Number.isFinite(value)) {
            let data = privateData.get(this);
            // if setted value higher than maximum hitpoints
            if (value > data.totalHitpoints) {
                data.currentHitpoints = data.totalHitpoints;
                return;
            }
            data.currentHitpoints = value;
        }
    };

    // getter for totalHitpoints
    Creature.prototype.getTotalHitpoints = function () {
        return privateData.get(this).totalHitpoints;
    };

    // setter for totalHitpoints
    Creature.prototype.setTotalHitpoints = function (value) {
        if (Number.isFinite(value) && value > 0) {
            let data = privateData.get(this);
            data.totalHitpoints = Math.floor(value);
            if (data.currentHitpoints > data.totalHitpoints) {
                data.currentHitpoints = data.totalHitpoints;
            }
        }
    };

    // getter for attack
    Creature.prototype.getAttack = function () {
        return privateData.get(this).attack;
    };

    // setter for attack
    Creature.prototype.setAttack = function (value) {
        if (Number.isFinite(value) && value >= 0) {
            privateData.get(this).attack = Math.floor(value);
        }
    };

    // defence from one strike
    Creature.prototype.defenceFromAttack = function (enemy) {
        // apply attack modifiers of enemy creature
        let modifiedAttack = enemy._calculateAttackWithAttackModifiers();
        // apply defense modifiers of this creature
        modifierAttack = this._calculateAttackWithDefenceModifiers(modifiedAttack);
        // set currentHitpoints 
        this.setHitpoints(this.getHitpoints() - modifierAttack);
        // check if this creature is dead and apply lose action
        if (this.isDead()) {
            this._loseAction(enemy);
        }
    };

    // strike enemy; method returns true or false (successful attack or not)
    Creature.prototype.fight = function (enemy) {
        // if dead it can't fight (or if enemy === this)
        if (this.isDead() || (enemy === this)) {
            return false;
        }
        // if creature is alive and ready to fight
        if (this._isCreature(enemy) && enemy.isAlive()) {
            // make strike
            enemy.defenceFromAttack(this);
            // if enemy is die after hit apply win action
            if (enemy.isDead()) {
                this._winAction(enemy);
            }
            return true;
        }
        return false;
    };

    // indicated if creature is alive
    Creature.prototype.isAlive = function () {
        return privateData.get(this).currentHitpoints > 0;
    };

    // indicated if creature is dead
    Creature.prototype.isDead = function () {
        return !(this.isAlive());
    };


    // private methods
    // helping methods
    // output for debugging
    Creature.prototype._toString = function () {
        let data = privateData.get(this);
        let retStr = "";
        retStr += `${data.name} | ${data.attack} | ${data.currentHitpoints}/${data.totalHitpoints} | wins: ${data._totalWins} | loses: ${data._totalLoses}`;
        return retStr;
    };

    // indicate if instance is creature
    Creature.prototype._isCreature = function (obj) {
        return obj instanceof Creature;
    };


    // override functions below for inheritance
    // calculate real attack power with modifiers(base)
    // override this function for child classes
    Creature.prototype._calculateAttackWithAttackModifiers = function () {
        return privateData.get(this).attack;
    }

    // calculate real attack power with modifiers(base)
    // override this function for child classes
    Creature.prototype._calculateAttackWithDefenceModifiers = function (attack) {
        return attack;
    }

    // apply win action
    // override this function for child classes
    Creature.prototype._winAction = function (enemy) {
        privateData.get(this)._totalWins++;
    };

    // apply lose action
    // override this function for child classes
    Creature.prototype._loseAction = function (enemy) {
        privateData.get(this)._totalLoses++;
    };


    // returning constructor and make clousure
    return Creature;

})();



// CHAMPION
let Champion = (function () {

    // default constant
    const HEAL_VALUE = 5;
    const DEFENCE_INCREASE_HP_VALUE = 1;
    const DEFENCE_BLOCK_TRIES = 2;
    const KILL_INCREASE_ATTACK = 1;

    // field for private properties
    let privateData = new WeakMap();

    // constructor
    function Champion(config) {
        Creature.call(this, config);
        // private properties
        privateData.set(this, {
            defenceBlockTries: 0
        });
    }

    Champion.prototype = Object.create(Creature.prototype);
    Champion.prototype.constructor = Champion;

    // increase currentHitpoints on HEAL_VALUE
    Champion.prototype.heal = function () {
        if (this.getHitpoints === this.getTotalHitpoints) {
            return false;
        }
        let data = privateData.get(this);
        this.setHitpoints(this.getHitpoints() + HEAL_VALUE);
        return true;
    };

    // increase totalHitpoints on DEFENCE_INCREASE_HP_VALUE and block next two attacks
    Champion.prototype.defence = function () {
        let data = privateData.get(this);
        this.setTotalHitpoints(this.getTotalHitpoints() + DEFENCE_INCREASE_HP_VALUE);
        data.defenceBlockTries = DEFENCE_BLOCK_TRIES;
        return true;
    };

    // calculate real attack power with modifiers
    // overriding function
    Champion.prototype._calculateAttackWithDefenceModifiers = function (attack) {
        let data = privateData.get(this);
        if (data.defenceBlockTries > 0) {
            --data.defenceBlockTries;
            return 0;
        }
        return attack;
    }

    // apply win functionality
    // overriding function
    // gets +KILL_INCREASE_ATTACK to attack for killing monsters and other champions
    Champion.prototype._winAction = function (enemy) {
        let data = privateData.get(this);
        Creature.prototype._winAction.call(this, enemy);
        this.setAttack(this.getAttack() + KILL_INCREASE_ATTACK);
    };

    // return function-constructor for clousure
    return Champion;

})();



// MONSTER
let Monster = (function () {

    // default constant
    const FURY_DECREASE_HP = 5;
    const FURY_INCREASE_ATTACK = 2;
    const ENRAGE_ATTACK_TRIES = 2;
    const ENRAGE_ATTACK_MULTIPLIER = 2;

    // field for private properties
    let privateData = new WeakMap();

    function Monster(config) {
        Creature.call(this, config);
        // private properties
        privateData.set(this, {
            enrageAttackTries: 0
        });
    }

    Monster.prototype = Object.create(Creature.prototype);
    Monster.prototype.constructor = Monster;

    // fury decrease total and current hitpoints by 5 and increase attack by 2
    Monster.prototype.fury = function () {
        if (this.getHitpoints() < 6) {
            return false;
        }
        let data = privateData.get(this);
        this.setHitpoints(this.getHitpoints() - FURY_DECREASE_HP);
        this.setTotalHitpoints(this.getTotalHitpoints() - FURY_DECREASE_HP);
        this.setAttack(this.getAttack() + FURY_INCREASE_ATTACK);
        return true;
    };

    // enrage increase damage in ENRAGE_ATTACK_MULTIPLIER times on ENRAGE_ATTACK_TRIES tries
    Monster.prototype.enrage = function () {
        let data = privateData.get(this);
        data.enrageAttackTries = ENRAGE_ATTACK_TRIES;
        return true;
    };

    // overriding functions for inheritance

    // calculate real attack power with modifiers(base)
    // overriding function
    Monster.prototype._calculateAttackWithAttackModifiers = function () {
        let data = privateData.get(this);
        if (data.enrageAttackTries > 0) {
            --data.enrageAttackTries;
            return ENRAGE_ATTACK_MULTIPLIER * this.getAttack();
        }
        return this.getAttack();
    }

    // apply win functionality
    // overriding function
    // restore 25% of their opponents total hitpoints and also add 10% of their opponents total hitpoints  to their own total hitpoints (floored to whole integers)
    Monster.prototype._winAction = function (enemy) {
        let data = privateData.get(this);
        Creature.prototype._winAction.call(this, enemy);
        let addTotalHitpoints = Math.floor(enemy.getTotalHitpoints() * 0.1);
        let addHitpoints = Math.floor(enemy.getTotalHitpoints() * 0.25);
        this.setTotalHitpoints(this.getTotalHitpoints() + addTotalHitpoints);
        this.setHitpoints(this.getHitpoints() + addHitpoints);
    };

    // return function-constructor for clousure
    return Monster;
})();



// TEST
var hunter = new Champion({ name: "Rexxar", attack: 10, hitpoints: 60 });
var beast = new Monster({ name: "King Krush", attack: 8, hitpoints: 80 });

console.log("MONSTER:\n", creat._toString());
console.log("CHAMPION:\n", champ._toString());

hunter.fight(beast);
console.log(beast.getHitpoints()); // -> 70
beast.enrage();
hunter.fight(beast);
console.log(beast.getHitpoints()); // -> 60
beast.fight(hunter);
console.log(hunter.getHitpoints()); // -> 44
hunter.fight(beast);
hunter.fight(beast);
hunter.fight(beast);
hunter.fight(beast);
hunter.fight(beast);
console.log(beast.isAlive()); // -> false
console.log(hunter.getAttack()); // -> 11
console.log(hunter.getHitpoints()); // -> 44
hunter.heal();
console.log(hunter.getHitpoints()); // -> 49
beast.fury();
beast.fight(hunter);
beast.fight(hunter);
hunter.defence();
beast.fight(hunter);
beast.fight(hunter);
beast.fight(hunter);
beast.fury();
beast.fight(hunter);

console.log("MONSTER:\n", beast._toString());
console.log("CHAMPION:\n", hunter._toString());