import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    calendars {
      _id
      todo
      date
    }
  }
`;

export const GET_CONTACTS = gql`    
  query GetContacts($_id: ID!) {
    contacts(_id: $_id) {
      contacts {
        id
      address1
      address2
      companyName
      email
      firstName
      lastName
      phone
    }
    }
  }
`;