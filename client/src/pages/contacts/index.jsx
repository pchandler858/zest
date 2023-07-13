import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import { seedDataContacts } from "../../data/seedData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { GET_CONTACTS } from "../../utils/queries.js";
import { DELETE_CONTACT } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import AUTH from "../../utils/auth";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const Contacts = () => {
  const { loading, data } = useQuery(GET_CONTACTS, {
    variables: {
      _id: AUTH.getProfile().data._id,
    },
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const handleDeleteContact = (e) => {
    const contactsId = e.currentTarget.parentElement.parentElement.getAttribute("data-id");
    console.log(e.currentTarget.parentElement.parentElement.getAttribute('data-id'));
    deleteContact({
      variables: {
        _id: AUTH.getProfile().data._id,
        contactsId: contactsId,
      },
    })
    window.location.reload();
  }
  const contacts = data?.contacts.contacts || [];
  console.log(contacts);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1, // flex: 1 is the same as flex-grow: 1 and flex-shrink: 1, combined.
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1, // flex: 1 is the same as flex-grow: 1 and flex-shrink: 1, combined.
      cellClassName: "name-column--cell",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1, // flex: 1 is the same as flex-grow: 1 and flex-shrink: 1, combined.
      cellClassName: "companyName-column--cell",
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
        <Button color="secondary" onClick={handleDeleteContact}>
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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTip: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="start" mb="20px">
          <Button
            component={Link}
            to="/contactForm"
            variant="contained"
            color="secondary"
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
