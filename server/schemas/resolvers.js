const { AuthenticationError } = require("apollo-server-express");
const { User, Calendar } = require("../models");
const { signToken } = require("../auth/auth");
const { ObjectId } = require("mongodb");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    calendars: async () => {
      return Calendar.find();
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
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addCalendarEvent: async (parent, { todo, date }) => {
      const event = await Calendar.create({ todo, date });
      return event;
    },
    deleteEvent: async (parent, { id }, context) => {
      const deleted = await Calendar.findByIdAndRemove(new ObjectId(id));
      return { id: deleted._id };
    },
  },
};

module.exports = resolvers;
