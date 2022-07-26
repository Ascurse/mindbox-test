import React, { FC } from "react";
import { ITodo } from "../../types/types";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Checkbox, IconButton } from "@mui/material";
import "./TodoItem.css";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: ITodo;
  handleToggle: (todoid: string) => void;
  removeTodo: (todoid: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, handleToggle, removeTodo }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={todo.completed ? "todo_item__completed" : "todo_item"}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      {todo.title}
      <IconButton onClick={() => removeTodo(todo.id)} data-testid="del">
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </motion.div>
  );
};

export default TodoItem;
