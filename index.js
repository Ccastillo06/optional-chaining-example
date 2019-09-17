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

/*
 * We try to get the adventurer's health points with a getHealth function
 * but we forgot to add it! This means doing adventurer.getHealth() will throw an error ❌
 */

// Calling getHealth direclty breaks code, by adding the `&&` operator we can check it exists.
console.log(adventurer.getHealth && adventurer.getHealth());

// Let's add the new Optional Chaining ⛓❓
console.log(adventurer.getHealth?.()); // The optional function invokation shortcircuits and return `undefined`. Much cleaner 🎊!

// Let's add a fallback value now so we never return undefined;
console.log(adventurer.getHealth?.() || adventurer.health); // This will fallback to adventurer.health which has a value of 100.

/*
 * We want our adventurer to attack with the weapon, but we forgot to create one!
 * This means accesing weapon.damage will break the code again! 😱
 * adventurer.attackWithWeapon() should be improved... Optional Chaining can rescue us in this situations!
 */

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

/*
 * Last but not least, we'll send our pet to attack the enemy, but wait... where's our pet! 🙀
 * We forgot to give one to the adventurer! That means adventurer.attackWithPet will break our code again...
 */

// Let's do the same and fix the method 💡
function attackWithPet() {
  return this.pet?.attack?.() || 0;
}

adventurer.attackWithPet = attackWithPet;

/*
 * We did a double check up there! ☝️
 * First check if pet exists and access attack, after that check if attack is defined and invoke it.
 * We even added a fallback value of 0 because having no pet meand we can't even do 1 damage 👻
 */
console.log(adventurer.attackWithPet()); // Returns 0 instead of breaking! 👏

/*
 * Last but not least, did you know we can also access dynamic properties this way?
 * Let's map the all the skills available for adventurers so we have an array with all our adventurer's skills descriptions ⚙️
 */
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

// PS: We should definitely teach the dev who made the Adventurer class our new skills so we don't have these issues anymore 🙄
