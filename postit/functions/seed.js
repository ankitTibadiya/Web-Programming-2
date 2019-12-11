const admin = require("firebase-admin");
admin.initializeApp();

const faker = require("faker");

const db = admin.firestore();

const fakeIt = () => {
  return db.collection("posts").add({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
  });
};

Array(20)
  .fill(0)
  .forEach(fakeIt);
