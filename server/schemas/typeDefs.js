const { gql } = require("apollo-server-express");

// PC ~ changed types "Date" to "String" to avoid errors. GQL doesn't have a Date type.
// PC ~ changed "Number" to "Int" to avoid errors. GQL doesn't have a Number type.

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
    age: Int
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
    date: String
  }
  type Projects {
    _id: ID
    name: String
    description: String
    status: String
    startDate: String
    endDate: String
    url: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User
    users: [User]!
    contacts: [Contacts]!
    contact(contactsId: ID!): Contacts
    applications: [Applications]!
    application(applicationsId: ID!): Applications
    calendar: [Calendar]!
    projects: [Projects]!
    project(projectsId: ID!): Projects
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String!, startDate: Date!, endDate: Date!, status: String!, url: String!): Projects
    addContact(name: String!, phone: String!, email: String!, age: Int!, address: String!): Contacts
    addApplication(businessName: String!, appliedOn: String!, phoneNumber: String!, email: String!): Applications
    updateProject(name: String!, description: String!, startDate: Date!, endDate: Date!, status: String!, url: String!): Projects
    updateContact(name: String!, phone: String!, email: String!, age: Int!, address: String!): Contacts
    updateApplication(businessName: String!, appliedOn: String!, phoneNumber: String!, email: String!): Applications
    removeProject(name: String!, description: String!, startDate: Date!, endDate: Date!, status: String!, url: String!): Projects
    removeContact(name: String!, phone: String!, email: String!, age: Int!, address: String!): Contacts
    removeApplication(businessName: String!, appliedOn: String!, phoneNumber: String!, email: String!): Applications
  }
`;

module.exports = typeDefs;
