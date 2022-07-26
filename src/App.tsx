import React from "react";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>TODOS</h1>
      <TodoList />
    </div>
  );
};

export default App;
