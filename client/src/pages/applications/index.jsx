import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import { seedData } from "../../data/seedData.js";
import Header from "../../components/Header.jsx";

const Applications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "dateApplied",
      headerName: "Date Applied",
      type: "date",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1, // flex: 1 is the same as flex-grow: 1 and flex-shrink: 1, combined.
      cellClassName: "companyName-column--cell",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1, // flex: 1 is the same as flex-grow: 1 and flex-shrink: 1, combined.
      cellClassName: "companyName-column--cell",
    },
    {
      field: "name",
      headerName: "Contact Person",
      flex: 1, 
      cellClassName: "contactPerson-column--cell",
    },
    // {
    //   field: "followUps",
    //   headerName: "Follow Ups",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
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
        <DataGrid rows={seedData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Applications;
