/**
 * =========================================
 * 1. Array.map()
 * =========================================
 */

const numbers = [1, 2, 3];

const doubled = numbers.map((num) => num * 2);

console.log(doubled); // [2, 4, 6]


/**
 * =========================================
 * 2. filter & find
 * =========================================
 */

const usersList = [
  { name: "A", age: 20 },
  { name: "B", age: 25 },
  { name: "C", age: 20 },
];

const age20Users = usersList.filter((user) => user.age === 20);
const firstAge20User = usersList.find((user) => user.age === 20);

console.log(age20Users);
console.log(firstAge20User);


/**
 * =========================================
 * 3. reduce()
 * =========================================
 */

const numbers2 = [1, 2, 3, 4];

// Sum
const sum = numbers2.reduce((acc, cur) => acc + cur, 0);

// Multiply
const product = numbers2.reduce((acc, cur) => acc * cur, 1);

// Convert to object
const numberToObject = numbers2.reduce((acc, cur) => {
  acc[cur] = cur;
  return acc;
}, {});

console.log(sum);
console.log(product);
console.log(numberToObject);


/**
 * =========================================
 * 4. flatMap()
 * =========================================
 */

const sentences = ["hello world", "js is fun"];

const words = sentences.flatMap((str) => str.split(" "));

console.log(words); // ["hello", "world", "js", "is", "fun"]


/**
 * =========================================
 * 5. Object Destructuring
 * =========================================
 */

const user1 = {
  name: "Giap",
  age: 22,
  address: {
    city: "Hanoi",
  },
};

const {
  name,
  address: { city },
} = user1;

console.log(name);
console.log(city);


/**
 * =========================================
 * 6. Dynamic Keys
 * =========================================
 */

function createObject(key, value) {
  return { [key]: value };
}

console.log(createObject("name", "Giap"));


/**
 * =========================================
 * 7. Object.entries()
 * =========================================
 */

const user2 = {
  name: "Giap",
  age: 22,
};

const userInfo = Object.entries(user2).map(
  ([key, value]) => `${key}: ${value}`
);

console.log(userInfo);


/**
 * =========================================
 * 8. Combined Task
 * =========================================
 */

const usersData = [
  { name: "A", age: 20, scores: [10, 20] },
  { name: "B", age: 25, scores: [30, 40] },
  { name: "C", age: 20, scores: [50] },
];

// 1. Filter age = 20
const filteredUsers = usersData.filter((user) => user.age === 20);

// 2. Flatten scores
const allScores = filteredUsers.flatMap((user) => user.scores);

// 3. Total score
const totalScore = allScores.reduce((acc, score) => acc + score, 0);

console.log(totalScore);