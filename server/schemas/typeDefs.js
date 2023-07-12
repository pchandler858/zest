const { gql } = require("apollo-server-express");

// PC ~ changed types "Date" to "String" to avoid errors. GQL doesn't have a Date type.
// PC ~ changed "Number" to "Int" to avoid errors. GQL doesn't have a Number type.

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    profilePicture: [ProfilePicture]
    contacts: [Contacts]
    applications: [Applications]
    # calendar: [Calendar]!
    # projects: [Projects]!
  }
  type Contacts {
    id: ID
    firstName: String
    lastName: String
    companyName: String
    phone: String
    email: String
    address1: String
    address2: String
  }
  type Applications {
    id: ID
    companyName: String
    appliedOn: String
    position: String
    contactName: String
  }
  type ProfilePicture {
    id: ID
    pictureUrl: String
  }
  type Calendar {
    _id: ID
    todo: String
    date: String
  }
  type DeletedEvent {
    _id: ID
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
    user(_id: String!): User
    users: [User]!
    contacts(_id: ID!): User!
    contact(contactsId: ID!): Contacts
    applications(_id: ID!): User!
    application(applicationsId: ID!): Applications
    profilePicture(_id: ID!): User!
    calendars: [Calendar]!
    projects: [Projects]!
    project(projectsId: ID!): Projects
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addProject(
      name: String!
      description: String!
      startDate: String!
      endDate: String!
      status: String!
      url: String!
    ): Projects
    addContact(
      _id: ID!
      firstName: String
      lastName: String
      companyName: String!
      phone: String!
      email: String!
      address1: String
      address2: String
    ): Contacts
    addApplication(
      _id: ID!
      companyName: String
      appliedOn: String
      position: String
      contactName: String
    ): Applications
    addProfilePicture(_id: ID!, pictureUrl: String): ProfilePicture
    updateProject(
      name: String!
      description: String!
      startDate: String!
      endDate: String!
      status: String!
      url: String!
    ): Projects
    updateContact(
      firstName: String!
      lastName: String!
      companyName: String!
      phone: String!
      email: String!
      address1: String!
      address2: String!
    ): Contacts
    updateApplication(
      businessName: String!
      appliedOn: String!
      phoneNumber: String!
      email: String!
    ): Applications
    removeProject(
      name: String!
      description: String!
      startDate: String!
      endDate: String!
      status: String!
      url: String!
    ): Projects
    deleteContact(_id: ID!, contactsId: ID!): Contacts
    deleteApplication(_id: ID!): Applications
    addCalendarEvent(todo: String!, date: String!): Calendar
    deleteEvent(id: ID!): DeletedEvent
    editCalendarEvent(id: ID!, todo: String!, date: String!): Calendar
  }
`;

module.exports = typeDefs;
