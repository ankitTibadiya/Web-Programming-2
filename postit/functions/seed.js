
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const faker = require("faker");

const db = firestore;

const fakeIt = () => {
  return db.collection("posts").add({
    userName: faker.internet.userName(),
    email: faker.internet.email()
  });
};

Array(20)
  .fill(0)
  .forEach(fakeIt);
