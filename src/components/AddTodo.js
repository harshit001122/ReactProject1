import { Box, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { allData } from "../App"; // Importing the context that stores all application data
import AddTodoButton from "./AddTodoButton"; // Importing the AddTodoButton component


 // useEffect hook to focus the input field when the component mounts or when 'addTodo' changes
 useEffect(() => {
  if (!allStoreData.addTodo) {
    inputRef.current.focus(); // Focus the input field if 'addTodo' is false
  }
}, [allStoreData.addTodo]);

// The AddTodo component is responsible for rendering the form to add a new todo item
const AddTodo = ({ cancelTodo, onChange, onKeyPress }) => {
  const allStoreData = useContext(allData); // Using context to get application data
  const inputRef = useRef(null); // Creating a reference to the input field


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          position: "absolute",
          width: "100%",
          zIndex: "3",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", sm: "70%", md: "50%", lg: "30%" },
            border: "2px solid #2823232e",
            bgcolor: "white",
          }}
        >
          <Typography variant="h5" sx={{ margin: "15px 5%" }}>
            Add Todo
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Enter Text Here"
            multiline
            rows={6}
            sx={{ width: "90%", marginLeft: "5%" }}
            onChange={onChange} // Handler for when the input value changes
            onKeyPress={onKeyPress} // Handler for key press events
            value={allStoreData.input} // Setting the value of the input field from context
            inputRef={inputRef} // Referencing the input field
          />
          <Box
            sx={{
              display: "flex",
              width: "80%",
              margin: "15px auto",
              justifyContent: "space-between",
            }}
          >
            <AddTodoButton TodoFunction={cancelTodo} btnTitle='cancel'  /> // Cancel button
            <AddTodoButton TodoFunction={allStoreData.addData} btnTitle='Add'  /> // Add button

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddTodo; // Exporting the AddTodo component as the default export
