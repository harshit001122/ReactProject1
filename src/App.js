import { Box, Button, Fab, Stack } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import DisplayTodo from "./components/DisplayTodo";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./components/FilterButton";

// Create a context to store and share data across components
export const allData = createContext();

const App = () => {
  // State to store the input value of the new todo item
  const [input, setInput] = useState("");

  // State to store the list of todo items
  const [data, setData] = useState([]);

  // State to manage the visibility of the AddTodo component
  const [addTodo, setAddTodo] = useState(true);

  // State to store the current filter type (all, completed, incompleted)
  const [todoType, setTodoType] = useState("all");

  // State to store the filtered list of todo items
  const [filteredData, setFilteredData] = useState([]);

  // Function to show the AddTodo component
  const addTodoBtn = () => {
    setAddTodo(false);
  };

  // Function to hide the AddTodo component
  const cancelTodo = () => {
    setAddTodo(true);
  };

  // Function to add a new todo item
  const addData = () => {
    if (input.trim() !== "") {
      setData([...data, { id: uuid(), text: input, check: false }]);
      toast.success("Your Todo Has been Added", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setInput("");
    } else {
      setInput("");
    }
    setAddTodo(true);
  };

  // Function to save the edited text of a todo item
  const saveEdit = (id, updatedvalue) => {
    if (updatedvalue.trim() !== "") {
      setData((prevData) =>
        prevData.map((e) =>
          e.id === id ? { ...e, text: updatedvalue.trim() } : e
        )
      );
      toast.success("Your Todo Has been Edited", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  // Function to delete a todo item
  const deleteData = (index) => {
    if (data.length > 0) {
      setData(data.filter((e) => e.id !== index));
    }

    toast.success("Your Todo Has been Deleted", {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // Function to handle key press events (specifically the Enter key) in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addData();
    }
  };

  // Function to toggle the checked state of a todo item
  const handleCheck = (id) => {
    const checkBoxData = data.map((e) =>
      e.id === id ? { ...e, check: !e.check } : e
    );
    setData(checkBoxData);
  };

  // useEffect to load todo items from local storage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem("Data");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setData(parsedData);
        } else {
          console.error("Invalid data format:", parsedData);
        }
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    }
  }, []);

  // useEffect to save todo items to local storage whenever the data state changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("Data", JSON.stringify(data));
    }
  }, [data]);

  // useEffect to filter todo items based on the selected filter type
  useEffect(() => {
    const updatedFilteredData = data.filter((todo) => {
      if (todoType === "completed") {
        return todo.check;
      } else if (todoType === "incompleted") {
        return !todo.check;
      }
      return true;
    });
    setFilteredData(updatedFilteredData);
  }, [data, todoType]);

  // Function to clear all todo items
  const clearAllData = () => {
    setData([]);
    localStorage.clear();
  };

  return (
    <allData.Provider
      value={{ addData, saveEdit, data, setTodoType, filteredData }}
    >
      <Box>
        <Header addTodoBtn={addTodoBtn} />
        {!addTodo && (
          <AddTodo
            cancelTodo={cancelTodo}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        )}
        {data.length > 0 && <Filter todoType={todoType} setTodoType={setTodoType} />}

        <Box sx={{ height: "500px", overflow: "auto" }}>
          {filteredData.map((e) => (
            <DisplayTodo
              key={e.id}
              text={e.text}
              id={e.id}
              deleteData={() => deleteData(e.id)}
              handleCheck={() => handleCheck(e.id)}
              checkData={e.check}
              complete={
                e.check ? (
                  <Fab size="small" color="success" sx={{ zIndex: 1 }} />
                ) : (
                  <Fab size="small" color="error" sx={{ zIndex: 1 }} />
                )
              }
            />
          ))}
        </Box>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          {data.length > 0 && (
            <Button variant="contained" onClick={clearAllData}>
              Clear all
            </Button>
          )}
        </Stack>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </allData.Provider>
  );
};

export default App; // Exporting the App component as the default export
