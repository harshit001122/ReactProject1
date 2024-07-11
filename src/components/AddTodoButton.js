import React from 'react'
import { Button } from '@mui/material';

// This component is used to create Todo button
const AddTodoButton = ({TodoFunction,btnTitle}) => {

  return (
    <Button
    variant="text"
    color={"primary"}
    sx={{ cursor: "pointer" }}
    onClick={TodoFunction}

  >
    {btnTitle}
  </Button>
  )
}

export default AddTodoButton
