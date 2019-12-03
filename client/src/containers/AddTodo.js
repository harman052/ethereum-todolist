import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { InputGroup, Button, Alert } from "@blueprintjs/core";
import { addTodo } from "../actions";
import messages from "../config/messages";
import "./AddTodo.scss";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      isDialogBoxOpen: false
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ inputText: event.target.value });
  };

  handleOnSubmit = async event => {
    const { dispatch, contract, accounts } = this.props;
    const { inputText } = this.state;
    event.preventDefault();
    if (!inputText.trim()) {
      return;
    }
    await contract.methods
      .createTask(inputText)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        dispatch(addTodo(inputText));
        this.setState({ inputText: "" });
      })
      .on("error", error => {
        this.setState({ inputText: "", isDialogBoxOpen: true });
        console.error(error);
      });
  };

  handleConfirm = () => {
    this.setState({ isDialogBoxOpen: false });
  };

  addButton = () => {
    return (
      <Button
        rightIcon="arrow-right"
        type="submit"
        text="Add Todo"
        large
        intent="success"
        onClick={event => this.handleOnSubmit(event)}
      />
    );
  };

  render() {
    const { inputText } = this.state;
    return (
      <div>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <InputGroup
            className="todo-input-field"
            large
            placeholder="e.g. grocery"
            value={inputText}
            type="text"
            onChange={event => this.handleChange(event)}
            leftIcon="list-detail-view"
            rightElement={this.addButton()}
            round
          />
        </form>
        <Alert
          confirmButtonText="OK"
          icon="error"
          intent="danger"
          isOpen={this.state.isDialogBoxOpen}
          onConfirm={() => this.handleConfirm()}
        >
          <p>
            <strong>{messages.error.exception.outOfGas.line1}</strong>
            <br />
            {messages.error.exception.outOfGas.line2}
          </p>
        </Alert>
      </div>
    );
  }
}

AddTodo.propTypes = {
  contract: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => {
  const { contract, accounts } = state.ethConnection;
  return {
    contract,
    accounts
  };
};

export default connect(mapStateToProps)(AddTodo);
