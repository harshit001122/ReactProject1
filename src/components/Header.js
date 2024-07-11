import { Box, Fab, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

// The Header component is responsible for rendering the header of the todo application
const Header = ({ addTodoBtn }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h3" sx={{ fontFamily: 'SFProDisplay', fontWeight: 'bolder' }}>
          Today {/* Display the header text */}
        </Typography>
        <Fab color="success" aria-label="add" onClick={addTodoBtn}>
          <AddIcon /> {/* Display the add icon button to add a new todo item */}
        </Fab>
      </Box>
    </>
  );
};

export default Header; // Exporting the Header component as the default export
