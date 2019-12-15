const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// const algoliasearch = require("algoliasearch");
// const APP_ID = functions.config().algolia.app;
// const ADMIN_ID = functions.config().algolia.key;

// const client = algoliasearch(APP_ID, ADMIN_ID);
// const index = client.initIndex("posts");

// exports.addToIndex = functions.firestore
//   .document("posts/{postId}")
//   .onCreate(snapshot => {
//     const data = snapshot.data();
//     const objectID = snapshot.id;

//     return index.addObject({ ...data, objectID });
//   });

// exports.updateIndex = functions.firestore
//   .document("posts/{postId}")
//   .onUpdate(change => {
//     const newdata = change.after.data();
//     const objectID = change.after.objectID;

//     return index.saveObject({ ...newdata, objectID });
//   });

// exports.deleteFromIndex = functions.firestore
//   .document("posts/{postId}")
//   .onDelete(snapshot => index.deleteObject(snapshot.id));

const createNotification = async notification => {
  const doc = await firestore.collection("notifications").add(notification);
  return console.log("notification added", doc);
};

exports.postCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(doc => {
    const post = doc.data();
    const notification = {
      content: "added a new post",
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.postUpdated = functions.firestore
  .document("posts/{postId}")
  .onUpdate(change => {
    const newPost = change.after.data();
    console.log("post", newPost);
    const notification = {
      content: "updated a post",
      user: `${newPost.authorFirstName} ${newPost.authorLastName}`,
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
