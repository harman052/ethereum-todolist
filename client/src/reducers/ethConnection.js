const initialState = {
  web3: {},
  accounts: [],
  contract: {}
};

const ethConnection = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_WEB3_INSTANCE":
      return { ...state, web3: payload };
    case "GET_USER_ACCOUNTS":
      return { ...state, accounts: payload };
    case "GET_CONTRACT_INSTANCE":
      return { ...state, contract: payload };
    default:
      return state;
  }
};

export default ethConnection;
