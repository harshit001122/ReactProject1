import { Button, Stack } from "@mui/material";
import React from "react";


// Function to handle click events on the filter buttons
const handleFilterClick = (filter) => {
  setTodoType(filter); // Set the selected filter type
};

// The Filter component is responsible for rendering filter buttons to filter todo items
const Filter = ({ todoType, setTodoType }) => {
  const filters = ["all", "completed", "incompleted"]; // Array of filter types


  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }}
    >
      {filters.map((filter) => (
        <Button
          key={filter} // Unique key for each button
          variant="contained"
          color={todoType === filter ? "secondary" : "primary"} // Change button color based on selected filter
          onClick={() => handleFilterClick(filter)} // Set the filter type on button click
          sx={{
            width: { sm: "60%", xs: "80%", md: "40%", lg: "23%" },
            height: "10%",
            fontSize: "15px",
          }}
        >
          {filter} {/* Display the filter type */}
        </Button>
      ))}
    </Stack>
  );
};

export default Filter; // Exporting the Filter component as the default export
