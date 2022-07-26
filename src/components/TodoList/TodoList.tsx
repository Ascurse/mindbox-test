import {
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React, { FC, useState } from "react";
import { ITodo } from "../../types/types";
import List from "../List";
import TodoItem from "../TodoItem/TodoItem";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const TodoList: FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [notification, setNotification] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

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
        items={todos}
        renderItem={(todo: ITodo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleToggle={handleToggle}
            removeTodo={removeTodo}
          />
        )}
      />
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
