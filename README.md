## Optional Chaining introduction 🤓

The **Optional Chaining** proposal is awesome and will definitely improve the JS ecosystem with the features it includes! [More at tc39](https://github.com/tc39/proposal-optional-chaining).

Here's a simple tutorial to learn about it by helping an adventurer to not break our code ⚔️

### First of all, an screenshot with an easy example to start rolling 🎢

<p align="center">
  <img src="https://raw.githubusercontent.com/Ccastillo06/optional-chaining-example/master/assets/example.png" alt="Example screenshot" />
</p>

### The tutorial 📒

We'll create an **Adventurer Class** with some incomplete methods that access properties that may not be defined.

```
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
```

It's time now to instance the `Adventurer` class and create a new adventurer called John.

```
const adventurer = new Adventurer({
  name: 'John',
  health: 100,
  skills: {
    run: {
      description: 'Escapes the battle as fast as possible! 🏎'
    },
    negotiate: {
      description: 'Talks to the enemy until finding an opportunity to run away 😑'
    }
  }
});
```

He is not the bravest one in the party, but we love him anyway.

### It's time to start learning this new Optional Chaining operator 📚

#### Let's access a `getHealth` method that we forgot to define.

We could try to get the adventurer's health points with a `getHealth` function but it's not defined!
This means doing `adventurer.getHealth()` will throw an error ❌

Calling `getHealth` direclty breaks code, by adding the `&&` operator we can check if it exists before invoking.

```
console.log(adventurer.getHealth && adventurer.getHealth());
```

Let's add the new Optional Chaining ⛓❓

```
console.log(adventurer.getHealth?.()); // The optional function invokation shortcircuits and return `undefined`. Much cleaner 🎊!
```

And a **fallback value now so we never return `undefined`**

```
console.log(adventurer.getHealth?.() || adventurer.health); // This will fallback to adventurer.health which has a value of 100.
```

#### Time to improve the `attackWithWeapon` method so it doesn't break our code when weapon is missing.

We want our adventurer to attack with the weapon, but we forgot to create one! This means accesing `weapon.damage` will break the code again! 😱
`adventurer.attackWithWeapon()` should be improved... Optional Chaining can rescue us in this situations!

We'll create a new `attackWithWeapon` function that uses Optional Chaining and rewrite the instance method with our improved version.

```
function attackWithWeapon() {
  return this.weapon?.damage;
}

adventurer.attackWithWeapon = attackWithWeapon;
```

And call it to see if we fixed the issue. Our code shouldn't break now...

```
console.log(adventurer.attackWithWeapon()); // Returns undefined instead of breaking!
```

We could also add a **fallback value so we never return `undefined`**

```
console.log(adventurer.attackWithWeapon() || 1); // Our adventurer isn't really strong, but doing our best is always the best option
```

#### We'll now order our pet to attack. This is kinda RPG so our pets are invulnerable super strong llamas or something similar 🦙

We'll send our pet to attack the enemy, but wait... where's our pet?! 🙀
We forgot to give one to the adventurer! That means `adventurer.attackWithPet` will break our code again...

Let's do the same as before and fix the method 💡

```
function attackWithPet() {
  return this.pet?.attack?.() || 0;
}

adventurer.attackWithPet = attackWithPet;
```

We did a double check up there! ☝️ First **we are checking if a pet exists and try to access attack**, after that, **we check if attack is defined and invoke it.**
We even added a fallback value of 0 because having no pet means we can't even do 1 damage.

```
console.log(adventurer.attackWithPet()); // Returns 0 instead of breaking!
```

We finally fixed our adventurer! 🎉

#### We could also check one more little this before finishing the tutorial...

Last but not least, did you know we can also access **dynamic properties** this way?
We could map all the skills available for adventurers so we have an array with all our adventurer's skills descriptions ⚙️

```
const allSkills = [
  'run',
  'negotiate',
  'intimidate',
  'scare',
  'menace',
];

const adventurerSkillsDescriptions = allSkills
  .map(skillName => {
    // Accesing only skills that exist in adventurer.skills before accessing the description.
    const skillDescrition = adventurer.skills?.[skillName]?.description;
    return skillDescrition;
  })
  .filter(Boolean); // Filtering the undefined values before assigning the array.
```

And here we have an array with all the descriptions! 🙌

```
console.log(adventurerSkillsDescriptions);
```

**We are done! We learnt something new today and helped our adventurer survive in the buggy world of code!** 🚀

PS: We should definitely teach the dev who made the Adventurer class our new skills so we don't have these issues anymore 🙄

### About the project

This was made with `Parcel` by adding the `@babel/plugin-proposal-optional-chaining` plugin to `.babelrc`.
Just run `npm start` and open the console in your browser to see the logs!
