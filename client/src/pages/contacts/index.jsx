import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { GET_CONTACTS } from "../../utils/queries.js";
import { DELETE_CONTACT } from "../../utils/mutations.js";
import { useQuery, useMutation } from "@apollo/client";
import AUTH from "../../utils/auth";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ContactForm from "../contactForm";

const Contacts = () => {
  const { loading, data, refetch } = useQuery(GET_CONTACTS, {
    variables: {
      _id: AUTH.getProfile().data._id,
    },
  });
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const [contacts, setContacts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false); // State variable for showing the form

  useEffect(() => {
    if (data?.contacts?.contacts) {
      setContacts(data.contacts.contacts);
    }
  }, [data]);

  const handleDeleteContact = async (contactsId) => {
    try {
      await deleteContact({
        variables: {
          _id: AUTH.getProfile().data._id,
          contactsId: contactsId,
        },
      });

      // Update the state variable after the deletion is successful
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactsId)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleToggleContactForm = () => {
    setShowContactForm((prevShowForm) => !prevShowForm);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address1",
      headerName: "Address 1",
      flex: 1,
    },
    {
      field: "address2",
      headerName: "City, State Zip",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/#`}>
          <Button color="secondary">
            <ModeEditOutlineOutlinedIcon />
          </Button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={() => handleDeleteContact(params.row.id)}
        >
          <HighlightOffOutlinedIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Contacts"
        subtitle="List of contacts for future reference"
      />
      <Box m="40px 0 0 0" height="75vh">
        {/* Show the ContactForm component only if showContactForm is true */}
        {showContactForm && <ContactForm refetch={refetch} />}
        <Box display="flex" justifyContent="start" mb="20px">
          {/* Toggle the showContactForm state when the button is clicked */}
          <Button
            component={Link}
            to="#"
            variant="contained"
            color="secondary"
            onClick={handleToggleContactForm}
          >
            Add New Contact
          </Button>
        </Box>
        <DataGrid
          rows={contacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
