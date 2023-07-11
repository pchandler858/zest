const { AuthenticationError } = require("apollo-server-express");
const { User, Calendar, Contacts, Applications } = require("../models");
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
    calendars: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return Calendar.find({ user: context.user._id });
    },
    contacts: async (parent, { _id }) => {
      return User.findOne({ _id }).populate("contacts");
    },
    applications: async (parent, { _id }) => {
      return User.findOne({ _id }).populate("applications");
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
    addCalendarEvent: async (parent, { todo, date }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const event = await Calendar.create({
        todo,
        date,
        user: context.user._id,
      });
      return event;
    },
    deleteEvent: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const deleted = await Calendar.findOneAndRemove({
        _id: new ObjectId(id),
        user: context.user._id,
      });
      return { id: deleted._id };
    },
    addContact: async (
      parent,
      { firstName, lastName, companyName, phone, email, address1, address2 },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const updateContacts = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $push: {
            contacts: {
              firstName,
              lastName,
              companyName,
              phone,
              email,
              address1,
              address2,
            },
          },
        }
      );
      return updateContacts;
    },
    addApplication: async (
      parent,
      { contactName, position, companyName, appliedOn },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const updateApplications = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $push: {
            applications: {
              contactName,
              appliedOn,
              companyName,
              position,
            },
          },
        }
      );
      return updateApplications;
    },
  },
};

module.exports = resolvers;
