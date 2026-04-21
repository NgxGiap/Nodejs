/**
 * =========================================
 * 1. Callback
 * =========================================
 */

function getDataCallback(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

getDataCallback((data) => {
  console.log(data);
});


/**
 * =========================================
 * 2. Callback Hell
 * =========================================
 */

function step1Callback(cb) {
  setTimeout(() => {
    console.log("Step 1");
    cb();
  }, 500);
}

function step2Callback(cb) {
  setTimeout(() => {
    console.log("Step 2");
    cb();
  }, 500);
}

function step3Callback(cb) {
  setTimeout(() => {
    console.log("Step 3");
    cb();
  }, 500);
}

step1Callback(() => {
  step2Callback(() => {
    step3Callback(() => {
      console.log("All steps completed");
    });
  });
});


/**
 * =========================================
 * 3. Promise
 * =========================================
 */

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
}


/**
 * =========================================
 * 4. Promise Chain
 * =========================================
 */

function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1");
      resolve();
    }, 500);
  });
}

function step2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2");
      resolve();
    }, 500);
  });
}

function step3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3");
      resolve();
    }, 500);
  });
}

step1()
  .then(step2)
  .then(step3)
  .then(() => console.log("All steps completed"))
  .catch((err) => console.error(err));


/**
 * =========================================
 * 5. Error Handling (Promise)
 * =========================================
 */

function getUserError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Error loading user");
    }, 500);
  });
}

getUserError()
  .then((user) => console.log(user))
  .catch(() => console.error("Something went wrong"));


/**
 * =========================================
 * 6. Async/Await
 * =========================================
 */

async function runSteps() {
  try {
    await step1();
    await step2();
    await step3();
    console.log("All steps completed");
  } catch (error) {
    console.error(error);
  }
}


/**
 * =========================================
 * 7. Async Error Handling
 * =========================================
 */

async function getUserAsync() {
  throw new Error("Failed");
}

async function handleUser() {
  try {
    const user = await getUserAsync();
    console.log(user);
  } catch (error) {
    console.error("Something went wrong", error.message);
  }
}

handleUser();


/**
 * =========================================
 * 8. Sequential vs Parallel
 * =========================================
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDelay() {
  console.log("Start");

  // Sequential
  await delay(1000);
  console.log("1 second later");

  await delay(1000);
  console.log("2 seconds later");

  // Parallel
  await Promise.all([delay(1000), delay(1000)]);
  console.log("Both tasks completed");

  console.log("End");
}

runDelay();


/**
 * =========================================
 * 9. Fake API
 * =========================================
 */

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Giap" });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2"]);
    }, 1000);
  });
}

async function getUserPosts() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);

    console.log("User:", user.name);
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

getUserPosts();