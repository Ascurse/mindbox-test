import {
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { ITodo } from "../../types/types";
import List from "../List";
import TodoItem from "../TodoItem/TodoItem";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "./TodoList.css";
import { motion } from "framer-motion";

const TodoList: FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [notification, setNotification] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [filtered, setFiltered] = useState<ITodo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    filterTodos();
  }, [todos, filter]);

  const addTodo = (value: string) => {
    if (value) {
      const newItem: ITodo = {
        id: new Date().toString(),
        title: value,
        completed: false,
      };
      setTodos([...todos, newItem]);
      setValue("");
    } else {
      setError("Todo text can not be empty!");
      setNotification(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(false);
  };

  const handleToggle = (id: string) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
  };

  const removeTodo = (id: string) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const filterTodos = () => {
    if (!filter || filter === "All") {
      setFiltered([...todos]);
    } else if (filter === "Completed") {
      setFiltered([...todos].filter((item) => item.completed === true));
    } else {
      setFiltered([...todos].filter((item) => item.completed === false));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Let's add a new task..."
          variant="outlined"
          onChange={handleChange}
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => addTodo(value)}>
                  <AddBoxOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <List
        items={filtered}
        renderItem={(todo: ITodo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleToggle={handleToggle}
            removeTodo={removeTodo}
          />
        )}
      />
      <div className="todo__filters">
        <div
          className={filter === "All" ? "filter__active" : "filter"}
          onClick={() => setFilter("All")}
        >
          All
        </div>
        <div
          className={filter === "Completed" ? "filter__active" : "filter"}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </div>
        <div
          className={filter === "Active" ? "filter__active" : "filter"}
          onClick={() => setFilter("Active")}
        >
          Active
        </div>
      </div>
      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={handleClose}
        message={error}
      />
    </div>
  );
};

export default TodoList;
