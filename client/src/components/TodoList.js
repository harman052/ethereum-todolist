import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";
import "./TodoList.scss";

const handleToggle = async (todo, toggleTodo, contract, accounts) => {
  await contract.methods
    .toggleCompleted(todo.id)
    .send({ from: accounts[0] })
    .on("receipt", () => {
      toggleTodo(todo.id);
    })
    .on("error", error => console.error(error));
};

const TodoList = ({ todos, toggleTodo, contract, accounts }) => (
  <div className="todolist">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => handleToggle(todo, toggleTodo, contract, accounts)}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  contract: PropTypes.object
};

export default TodoList;
