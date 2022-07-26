import React, { FC } from "react";
import { ITodo } from "../../types/types";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import "./TodoItem.css";

interface TodoItemProps {
  todo: ITodo;
  handleToggle: (todoid: string) => void;
  removeTodo: (todoid: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, handleToggle, removeTodo }) => {
  return (
    <div className={todo.completed ? "todo_item__completed" : "todo_item"}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      {todo.title}
      <IconButton onClick={() => removeTodo(todo.id)}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default TodoItem;
