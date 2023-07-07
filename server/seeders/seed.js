const db = require("../config/connection");
const { User } = require("../models/index");

const userSeeds = [
  {
    email: "testuser1@example.com",
    password: "password123",
    firstName: "Test",
    lastName: "User1",
  },
  {
    email: "testuser2@example.com",
    password: "password123",
    firstName: "Test",
    lastName: "User2",
  },
  {
    email: "testuser3@example.com",
    password: "password123",
    firstName: "Test",
    lastName: "User3",
  },
];

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
