const messages = {
  error: {
    contract:
      "Failed to load web3, accounts, or contract. Check browser console for details.",
    exception: {
      outOfGas: {
        line1: "Transaction was not completed.",
        line2: "Reason: Ran out of gas."
      }
    },
    generic: {
      title: "An error occurred",
      description: "Check browser console for more details."
    }
  },
  emptyTodoList: {
    title: "No todos!",
    description: "You can add todos from above"
  }
};

export default messages;
