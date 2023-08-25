import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "../utils/queries"; // Importing your GET_CONTACTS query

const ContactContext = createContext();

export const useContacts = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // Fetch initial data here and set it to contacts
  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: { _id: id }, // Replace 'yourUserId' with the actual user ID
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setContacts(data.contacts.contacts); // Navigate through the nested 'contacts' fields
    }
  }, [data, loading, error]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
