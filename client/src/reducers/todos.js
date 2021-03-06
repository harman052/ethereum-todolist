const todos = (state = [], action) => {
  switch (action.type) {
    case "INITIALISE_TODO_LIST":
      return [...action.todoList];
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          content: action.content,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;
