let nextTodoId = 0;
export const addTodo = content => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  content
});

export const initialiseTodoList = todoList => ({
  type: "INITIALISE_TODO_LIST",
  todoList
});

export const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const GetWeb3Instance = web3 => ({
  type: "GET_WEB3_INSTANCE",
  payload: web3
});

export const GetUserAccounts = accounts => ({
  type: "GET_USER_ACCOUNTS",
  payload: accounts
});

export const GetContractInstance = contract => ({
  type: "GET_CONTRACT_INSTANCE",
  payload: contract
});
