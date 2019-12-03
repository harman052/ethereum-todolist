import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner, Alert, Intent } from "@blueprintjs/core";
import messages from "../config/messages";
import UIState from "../components/UIState";
import Filter from "../components/Filter";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import initialiseContract from "../web3Setup/InitialiseContract";
import "./App.scss";
import {
  initialiseTodoList,
  GetWeb3Instance,
  GetUserAccounts,
  GetContractInstance
} from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      todoCount: null,
      isError: false,
      isDialogBoxOpen: false
    };
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    initialiseContract().then(
      response => {
        const { web3, accounts, contract } = response;

        /** Save instances on Redux store */
        dispatch(GetWeb3Instance(web3));
        dispatch(GetUserAccounts(accounts));
        dispatch(GetContractInstance(contract));

        /**
         * Fetch todos from blockchain and storing in
         * Redux store. Also, catch errors, if any.
         */
        this.fetchTodoList().catch(error => {
          this.catchError(error);
        });
      },
      /** Catch any errors during web3 or contract initialisation. */
      error => {
        this.catchError(error);
      }
    );
  };

  getTodoCount = async () => {
    const { contract } = this.props;
    const todoCount = await contract.methods.taskCount().call();
    this.setState({ todoCount });
    return todoCount;
  };

  getTodo = async id => {
    const { contract } = this.props;
    return await contract.methods.tasks(id).call();
  };

  /**
   * Fetch individual todos. If request is
   * successful, save them in Redux store.
   */
  getAllTodos = todoCount => {
    const { dispatch } = this.props;
    const todoList = [];
    if (todoCount === 0) {
      this.setState({ isLoading: false });
      return;
    }
    for (let i = 0; i <= todoCount; i++) {
      this.getTodo(i).then(
        todo => todoList.push(todo),
        error => this.catchError(error)
      );
    }
    /**
     * Save fetched todos to redux state
     */
    dispatch(initialiseTodoList(todoList));
    this.setState({ isLoading: false });
  };

  /**
   * If request fails, set state appropriately
   * and log error in browser console
   */
  catchError = error => {
    this.setState({
      isError: true,
      isLoading: false,
      isDialogBoxOpen: true
    });
    console.error(error);
  };

  fetchTodoList = async () => {
    this.setState({ isLoading: true });
    this.getTodoCount().then(
      todoCount => this.getAllTodos(todoCount),
      error => this.catchError(error)
    );
  };

  renderTodos = () => {
    const { isError, todoCount, isLoading } = this.state;
    if (isError) {
      return (
        <UIState
          icon="error"
          iconSize="40"
          title={messages.error.generic.title}
          desc={messages.error.generic.description}
          intent={Intent.DANGER}
        ></UIState>
      );
    }
    if (!isError && !isLoading && todoCount === 0) {
      return (
        <UIState
          icon="endorsed"
          iconSize="60"
          title={messages.emptyTodoList.title}
          desc={messages.emptyTodoList.description}
          intent={Intent.SUCCESS}
        ></UIState>
      );
    }
    return <VisibleTodoList />;
  };

  closeDialogBox = () => {
    this.setState({ isDialogBoxOpen: false });
  };

  render() {
    return (
      <div className="app-container">
        <div className="todolist-container">
          <h2>Simple Todo List</h2>
          <div className="input-section">
            <AddTodo />
            <Filter />
          </div>
        </div>
        {this.state.isLoading ? <Spinner></Spinner> : this.renderTodos()}
        <Alert
          confirmButtonText="OK"
          icon="error"
          intent="danger"
          isOpen={this.state.isDialogBoxOpen}
          onClose={() => this.closeDialogBox()}
          canOutsideClickCancel
          canEscapeKeyCancel
          onConfirm={() => this.closeDialogBox()}
        >
          <strong>{messages.error.generic.title}</strong>
          <p>{messages.error.generic.description}</p>
        </Alert>
      </div>
    );
  }
}

App.propTypes = {
  web3: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.string),
  contract: PropTypes.object
};

const mapStateToProps = state => {
  const {
    ethConnection: { web3, accounts, contract }
  } = state;
  return {
    web3,
    accounts,
    contract
  };
};

export default connect(mapStateToProps)(App);
