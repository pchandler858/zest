const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    # contacts: [Contacts]!
    # applications: [Applications]!
    # calendar: [Calendar]!
    # projects: [Projects]!
  }
  type Contacts {
    _id: ID
    name: String
    phone: String
    email: String
    age: Number
    address: String
  }
  type Applications {
    _id: ID 
    businessName: String
    appliedOn: String
    phoneNumber: String
    email: String
  }
  type Calendar {
    _id: ID
    todo: String
    date: Date
  }
  type Projects {
    _id: ID
    name: String
    description: String
    status: String
    startDate: Date
    endDate: Date
    url: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User
    users: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
  `;

module.exports = typeDefs;
