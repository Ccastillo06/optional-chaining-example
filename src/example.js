import get from 'lodash.get';

const adventurer = {
  name: 'John',
  heatlh: 100,
  weapon: {
    name: 'Sword',
    damage: 30,
  },
};

// Using the Optional Chaining operator we can get the character damage by checking if the property exists.
// Vanilla
function attackWithWeaponVanilla(character) {
  if (character && character.weapon && character.weapon.damage) {
    return character.weapon.damage;
  }

  return 0;
}

// Lodash
function attackWithWeaponLodash(character) {
  return get(character, 'weapon.damage', 0);
}

// Optional chaining 🚀
function attackWithWeaponOC(character) {
  return character?.weapon?.damage || 0;
}

// All function invokations return the same.
attackWithWeaponVanilla(adventurer); // Returns 30
attackWithWeaponLodash(adventurer); // Returns 30
attackWithWeaponOC(adventurer); // Returns 30

attackWithWeaponVanilla(); // Returns 0
attackWithWeaponLodash(); // Returns 0
attackWithWeaponOC(); // Returns 0
