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
  mutation addContact($_id:ID!, $firstName: String, $lastName: String, $email: String!, $phone: String!, $companyName: String!, $address1: String, $address2: String,) {
    addContact(_id:$_id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, companyName: $companyName, address1: $address1, address2: $address2,) {
      id
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

export const DELETE_CONTACT = gql`
  mutation deleteContact($_id: ID!, $contactsId: ID!) {
    deleteContact(_id: $_id, contactsId: $contactsId) {
      id
    }
  }
`;

export const ADD_APPLICATION = gql`
  mutation addApplication($_id:ID!, $appliedOn: String, $companyName: String, $position: String!, $contactName: String!) {
    addApplication(_id:$_id, appliedOn: $appliedOn, companyName: $companyName, position: $position, contactName: $contactName) {
      id
      appliedOn
      contactName
      companyName
      position
    }   
  } 
`;

// export const DELETE_APPLICATION = gql`
//   mutation DeleteApplication($_id: ID!) {
//     deleteApplication(_id: $_id) {
//       id
//     }
//   }
// `;