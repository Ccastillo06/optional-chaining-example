class Adventurer {
  constructor({ name, health, skills, weapon, pet }) {
    this.name = name;
    this.health = health;
    this.skills = skills;
    this.weapon = weapon;
    this.pet = pet;
  }

  attackWithWeapon() {
    return this.weapon.damage;
  }

  attackWithPet() {
    return this.pet.attack();
  }
}

const adventurer = new Adventurer({
  name: 'John',
  health: 100,
  skills: {
    run: {
      description: 'Escapes the battle as fast as possible! 🏎',
    },
    negotiate: {
      description:
        'Talks to the enemy until finding an opportunity to run away 😑',
    },
  },
});

// Let's access a `getHealth` method that we forgot to define.

// Calling getHealth direclty breaks code, by adding the `&&` operator we can check it exists.
console.log(adventurer.getHealth && adventurer.getHealth());

// Let's add the new Optional Chaining ⛓❓
console.log(adventurer.getHealth?.()); // The optional function invokation shortcircuits and return `undefined`. Much cleaner 🎊!

// Let's add a fallback value now so we never return undefined;
console.log(adventurer.getHealth?.() || adventurer.health); // This will fallback to adventurer.health which has a value of 100.

// Time to improve the `attackWithWeapon` method so it doesn't break our code when weapon is missing.

// Let's create a new attackWithWeapon function that uses Optional Chaining.
function attackWithWeapon() {
  return this.weapon?.damage;
}

// Rewrite the instance method now with our improved version ✅
adventurer.attackWithWeapon = attackWithWeapon;

// And call it to see if we fixed the issue. The could shouldn't break now...
console.log(adventurer.attackWithWeapon()); // Returns undefined instead of breaking! 👏

// Let's add a fallback value now so we never return undefined;
console.log(adventurer.attackWithWeapon() || 1); // Our adventurer isn't really strong, but doing our best is always the best option 💪

// We'll now order our pet to attack. This is kinda RPG so our pets are invulnerable super strong llamas or something similar 🦙

// Let's do the same and fix the method 💡
function attackWithPet() {
  return this.pet?.attack?.() || 0;
}

adventurer.attackWithPet = attackWithPet;

console.log(adventurer.attackWithPet()); // Returns 0 instead of breaking! 👏

// Last but not least, let's check dynamic properties using Optiona Chaining!

const allSkills = ['run', 'negotiate', 'intimidate', 'scare', 'menace'];

const adventurerSkillsDescriptions = allSkills
  .map((skillName) => {
    // We are accesing only skills that exist in adventurer.skills before accessing the description.
    const skillDescrition = adventurer.skills?.[skillName]?.description;
    return skillDescrition;
  })
  .filter(Boolean); // Filtering the undefined values before assigning the array.

// Now we have an array with all the descriptions! 🙌
console.log(adventurerSkillsDescriptions);

// So here we have some examples with Optional Chaining! I hope it was useful and helps you improve your JS skills! 🚀
