import React from "react";
import { Checkbox } from "@blueprintjs/core";
import PropTypes from "prop-types";

const Todo = ({ onClick, completed, content }) => (
  <Checkbox
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {content}
  </Checkbox>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
};

export default Todo;
