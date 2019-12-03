import getWeb3 from "./getWeb3";
import TodoListContract from "../contracts/TodoList.json";

const initialiseContract = async () => {
  const web3 = await getWeb3();

  /** Use web3 to get the user's accounts. */
  const accounts = await web3.eth.getAccounts();

  /** Get the contract instance. */
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = TodoListContract.networks[networkId];
  const contract = new web3.eth.Contract(
    TodoListContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  return { web3, accounts, contract };
};

export default initialiseContract;
