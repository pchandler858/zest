import { Button, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import { GET_APPLICATIONS } from "../../utils/queries.js";
import { useQuery, useMutation } from "@apollo/client";
import AUTH from "../../utils/auth.js";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { DELETE_APPLICATION } from "../../utils/mutations.js";
import React, { useState, useEffect } from "react";

const Applications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loading, data } = useQuery(GET_APPLICATIONS, {
    variables: {
      _id: AUTH.getProfile().data._id,
    },
  });

  const [deleteApplication] = useMutation(DELETE_APPLICATION);

  // Create a state variable to hold the applications data
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (data?.applications?.applications) {
      setApplications(data.applications.applications);
    }
  }, [data]);

  const handleDeleteApplication = async (e) => {
    const applicationsId =
      e.currentTarget.parentElement.parentElement.getAttribute("data-id");
    console.log("Attempting to delete application with ID:", applicationsId); // Debug line

    try {
      const result = await deleteApplication({
        variables: {
          _id: AUTH.getProfile().data._id,
          applicationsId: applicationsId,
        },
      });
      console.log("Delete application result:", result); // Debug line

// setApplications(prevApplications => prevApplications.filter(app => app.id !== applicationsId));


      // Update the state variable after the deletion is successful
      setApplications((prevApplications) => {
        const newApplications = prevApplications.filter(
          (app) => app.id !== applicationsId
        );
        console.log("New applications array:", newApplications); // Debug line
        return newApplications;
      });
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const columns = [
    {
      field: "appliedOn",
      headerName: "Date Applied",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "companyName-column--cell",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      cellClassName: "companyName-column--cell",
    },
    {
      field: "contactName",
      headerName: "Contact Person",
      flex: 1,
      cellClassName: "contactPerson-column--cell",
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.3,
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
      flex: 0.3,
      renderCell: (params) => (
        <Button color="secondary" onClick={handleDeleteApplication}>
          <HighlightOffOutlinedIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Applications"
        subtitle="See all of your submitted applications"
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
        }}
      >
        <Box display="flex" justifyContent="start" mb="20px">
          <Button
            component={Link}
            to="/applicationForm"
            variant="contained"
            color="secondary"
          >
            Add New Application
          </Button>
        </Box>
        <DataGrid rows={applications} columns={columns} />
      </Box>
    </Box>
  );
};

export default Applications;
