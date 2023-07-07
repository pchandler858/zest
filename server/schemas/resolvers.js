const {AuthenticationError} = require("apollo-server-express");
const {User} = require("../models");
const {signToken} = require("../auth/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, {email}) => {
      return User.findOne({email});
    },
  },
  // users: async () => {
  //   return User.find().populate('thoughts');
  // },
  // user: async (parent, { username }) => {
  //   return User.findOne({ username }).populate('thoughts');
  // },
  // thoughts: async (parent, { username }) => {
  //   const params = username ? { username } : {};
  //   return Thought.find(params).sort({ createdAt: -1 });
  // },
  // thought: async (parent, { thoughtId }) => {
  //   return Thought.findOne({ _id: thoughtId });
  // },
  // },

  Mutation: {
    addUser: async (parent, {firstName, lastName, email, password}) => {
      // First we create the user
      const user = await User.create({firstName, lastName, email, password});
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return {token, user};
    },
    login: async (parent, {email, password}) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({email});
      console.log(user);
      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return {token, user};
    },
  },
};

module.exports = resolvers;
