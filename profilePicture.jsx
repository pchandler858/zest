// FormDialog //
// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { UPDATE_PICTURE } from "../utils/mutations";
// import Auth from "../utils/auth";

// const [formState, setFormState] = useState({ profilePicture: "" });
// const [updatePicture, { error, data }] = useMutation(UPDATE_PICTURE);

// const handleFormSubmit = async () => {
//   console.log(formState);
//   try {
//     const { data } = await updatePicture({
//       variables: { ...formState },
//     });
//   } catch (e) {
//     console.error(e);
//   }

//   setFormState({
//     profilePicture: "",
//   });
// };

//   <TextField
//             autoFocus
//             margin="dense"
//             label="Profile Picture"
//             name="profilePicture"
//             type="text"
//             fullWidth
//             variant="standard"
//             onChange={(e) =>
//               setFormState({ ...formState, profilePicture: e.target.value })
//             }
//           />

//     <Button
//             onClick={() => {
//               handleFormSubmit();
//               onClose();
//             }}
//             sx={{ color: colors.greenAccent[600] }}>
//             Apply
//           </Button>

// form > index.jsx //
{/* <Header title="Create New Contact" subtitle="" /> */}

// // sidebar.jsx //
// import React, {useState, useEffect} from "react";
// import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
// import {Box, IconButton, Typography, useTheme} from "@mui/material";
// import {Link} from "react-router-dom";
// import {tokens} from "../../theme";
// import { useParams } from 'react-router-dom';

// const [formState, setFormState] = useState({profilePicture: ""});
//   const { urlId } = useParams();

//   const pictureURL = () => {
    
//   }

//   console.log(formState.profilePicture);

//   <Box display="flex" justifyContent="center" alignItems="center">
//                 {/* update profile image */}
//                 <img
//                   onClick={handleClickOpen}
//                   role="button"
//                   alt="profile-user"
//                   width="100px"
//                   height="100px"
//                   src={formState.profilePicture}
//                   // src={`../../assets/user.png`}
//                   style={{cursor: "pointer", borderRadius: "50%"}}
//                 />
//               </Box>

// sign-in index.jsx //
// console.log('this is your mom')
//       // user object
//       console.log(data.login);

// mutations //
// export const UPDATE_PICTURE = gql`
//   mutation updatePicture($profilePicture: String!) {
//     updatePicture(profilePicture: $profilePicture) {
//       user {
//         _id
//         profilePicture
//       }
//     }
//   }
// `;

// resolvers //
// updatePicture: async (parent, { id, profilePicture }, context) => {
//     console.log(parent);
//     console.log(context);
//     const updated = await User.findByIdAndUpdate(
//       new ObjectId(id),
//       { profilePicture },
//       { new: true }
//     );
//     return updated;
//   },

// type defs //
// type User {
//     _id: ID
//     firstName: String
//     lastName: String
//     email: String
//     password: String
//     profilePicture: String
//     # contacts: [Contacts]!
//     # applications: [Applications]!
//     # calendar: [Calendar]!
//     # projects: [Projects]!
//   }

// seed //
// profilePicture: "https://randomuser.me/api/portraits/men/74.jpg",