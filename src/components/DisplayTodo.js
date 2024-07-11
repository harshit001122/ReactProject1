// import { CheckBox } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Divider,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { allData } from "../App"; // Importing the context that stores all application data
import AddIcon from "@mui/icons-material/Add";

// The DisplayTodo component is responsible for rendering individual todo items
const DisplayTodo = ({
  text, // The text of the todo item
  id, // The unique id of the todo item
  deleteData, // Function to delete the todo item
  handleCheck, // Function to handle checkbox state changes
  checkData, // Boolean indicating if the todo item is checked
  complete, // Additional UI element or information for completed items
}) => {
  const [edit, setEdit] = useState(false); // State to track if the item is in edit mode
  const [updateInput, setUpdateInput] = useState(text); // State to track the current value of the text field
  const inputRef = useRef(null); // Creating a reference to the input field
  const allStoreData = useContext(allData); // Using context to get application data

  // useEffect hook to focus the input field when edit mode is activated
  useEffect(() => {
    if (edit) {
      inputRef.current.focus(); // Focus the input field if 'edit' is true
    }
  }, [edit]);

  // Function to toggle edit mode and set the input field value to the current text
  const handleEdit = () => {
    setUpdateInput(text);
    setEdit(!edit);
  };

  // Function to save the edited text and exit edit mode
  const handleBlur = () => {
    allStoreData.saveEdit(id, updateInput); // Save the edited text using the context function
    setEdit(false); // Exit edit mode
  };

  // Function to handle key press events in the input field (specifically the Enter key)
  const handleEditInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          minHeight: "60px",
          fontFamily: 'SFProDisplay',
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            textAlign: "left",
            fontFamily: 'SFProDisplay',
          }}
        >
          <Checkbox onClick={handleCheck} checked={checkData} /> {/* Checkbox for marking the item as complete */}
          {!edit ? (
            <Typography variant="h5" sx={{ wordWrap: "anywhere", fontFamily: 'SFProText' }}>
              {text} {/* Display the text when not in edit mode */}
            </Typography>
          ) : (
            <TextField
              label="Enter text"
              value={updateInput}
              onBlur={handleBlur} // Save the edited text when the input field loses focus
              onChange={(e) => setUpdateInput(e.target.value)} // Update the state when the input field value changes
              onKeyPress={(e) => handleEditInputKeyPress(e)} // Handle key press events
              inputRef={inputRef} // Referencing the input field
            />
          )}
        </Box>
        <Box sx={{ width: { xs: "40%", lg: "23%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {!edit ? (
              <Fab
                size="small"
                color="secondary"
                aria-label="edit"
                onClick={handleEdit} // Enter edit mode when the edit button is clicked
                sx={{ zIndex: 1 }}
              >
                <EditIcon sx={{ fontFamily: 'SFProDisplay' }} />
              </Fab>
            ) : (
              <Fab
                size="small"
                color="success"
                aria-label="add"
                onClick={handleBlur} // Save the edited text when the add button is clicked
                sx={{ zIndex: 1, fontFamily: 'SFProDisplay' }}
              >
                <AddIcon />
              </Fab>
            )}
            <Fab
              size="small"
              color="error"
              aria-label="delete"
              onClick={() => deleteData(id)} // Delete the item when the delete button is clicked
              sx={{ zIndex: 1, fontFamily: 'SFProDisplay' }}
            >
              <DeleteIcon />
            </Fab>
            {complete} {/* Display additional UI element or information for completed items */}
          </Box>
        </Box>
      </Box>
      <Divider /> {/* Divider to separate the todo items */}
    </Box>
  );
};

export default DisplayTodo; // Exporting the DisplayTodo component as the default export
