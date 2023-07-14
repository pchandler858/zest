import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ADD_APPLICATION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
// import { useState } from "react";
import AUTH from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const initialValues = {
  contactName: "",
  companyName: "",
  appliedOn: "",
  position: "",
};

const phoneRegExp = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const ApplicationForm = () => {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  // const [formState, setFormState] = useState(initialValues);
  const [addApplication] = useMutation(ADD_APPLICATION);
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await addApplication({
        variables: {
          _id: AUTH.getProfile().data._id,
          contactName: values.contactName,
          companyName: values.companyName,
          appliedOn: values.appliedOn,
          position: values.position,
        },
      });
      console.log(data);
      window.location.href = "/applications";
      // navigate("/applications");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box m="20px">
      <Header
        title="Add Application"
        subtitle="Keep track of your job search!"
      />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNotMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactName}
                name="contactName"
                error={!!touched.contactName && !!errors.contactName}
                helperText={touched.contactName && errors.contactName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date Applied"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.appliedOn}
                name="appliedOn"
                error={!!touched.appliedOn && !!errors.appliedOn}
                helperText={touched.appliedOn && errors.appliedOn}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                value="Submit"
              >
                Create New Application
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ApplicationForm;
