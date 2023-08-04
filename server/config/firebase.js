const admin = require("firebase-admin");
const credentials = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = admin;
