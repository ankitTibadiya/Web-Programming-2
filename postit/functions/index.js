const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from StarWars!");
});

const createNotification = async notification => {
  const doc = await firestore.collection("notifications").add(notification);
  return console.log("notification added", doc);
};

exports.postCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(doc => {
    const post = doc.data();
    const notification = {
      content: "Added a new post",
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate(async user => {
  const doc = await firestore
    .collection("users")
    .doc(user.uid)
    .get();
  const newUser = doc.data();
  const notification = {
    content: "joined the party",
    user: `${newUser.firstName} ${newUser.lastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  };
  return createNotification(notification);
});
