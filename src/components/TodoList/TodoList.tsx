import {
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Button,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { ITodo } from "../../types/types";
import List from "../List";
import TodoItem from "../TodoItem/TodoItem";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "./TodoList.css";

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
    setTodos(JSON.parse(localStorage.getItem("todos") || "[]"));
  }, []); /*При перезагрузке страницы вытягиваем из хранилища тудушки с прошлой сессии */

  useEffect(() => {
    filterTodos();
  }, [todos, filter]);

  const saveLocalTodos = () => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    ); /*Запись в хранилище (БАГ: не сохраняется последний элемент) */
  };

  const addTodo = (value: string) => {
    if (value) {
      const newItem: ITodo = {
        id: new Date().toString(),
        title: value,
        completed: false,
      };
      setTodos([...todos, newItem]);
      saveLocalTodos();
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
    saveLocalTodos();
  };

  const removeTodo = (id: string) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
    saveLocalTodos();
  };

  const clearCompleted = () => {
    setTodos([...todos.filter((todo) => todo.completed === false)]);
    saveLocalTodos();
  }; /*Не до конца понял нужно ли было удалять выполненные или просто убрать галочки */

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
    <div className="todo_list">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          fullWidth
          maxRows={4}
          label="Let's add a new task..."
          variant="outlined"
          onChange={handleChange}
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => addTodo(value)} data-testid="add">
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
        <Button
          disabled={filter === "All" ? true : false}
          onClick={() => setFilter("All")}
          data-testid="all"
        >
          All
        </Button>
        <Button
          disabled={filter === "Completed" ? true : false}
          onClick={() => setFilter("Completed")}
          data-testid="completed"
        >
          Completed
        </Button>
        <Button
          disabled={filter === "Active" ? true : false}
          onClick={() => setFilter("Active")}
          data-testid="active"
        >
          Active
        </Button>
      </div>
      <div className="todo__filters__additional">
        <p>
          {[...todos].filter((item) => item.completed === false).length} items
          left
        </p>
        <Button onClick={clearCompleted}>Clear completed</Button>
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
