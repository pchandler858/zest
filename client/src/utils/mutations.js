import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    calendars {
      _id
      todo
      date
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($todo: String!, $date: String!) {
    addCalendarEvent(todo: $todo, date: $date) {
      _id
      todo
      date
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      _id
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($name: String!, $email: String!, $phone: String!, $companyName: String!, $address: String!, ) {
    addContact(name: $name, email: $email, phone: $phone, companyName: $companyName, address: $address,) {
      _id
      firstName
      lastName
      email
      phone
      companyName
      address1
      address2
    }   
  } 
`;