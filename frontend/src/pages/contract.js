import { useMoralis } from "react-moralis";
import Web3 from "web3";
// import MyContractABI from "./MyContractABI.json";
// import MyContractBytecode from "./MyContractBytecode.json";
import Walletconnect from "@/components/navigation/WalletConnect";

export default function DeployContractButton() {
  const { web3, isWeb3Enabled } = useMoralis();
  const MyContractABI = [
    {
      inputs: [],
      name: "getGreeting",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_greeting",
          type: "string",
        },
      ],
      name: "setGreeting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const MyContractBytecode =
    "0x608060405234801561001057600080fd5b50610173806100206000396000f3fe60806040526004361061003e576000357c010000000000000000000000000000000000000000000000000000000090048063cfae321714610043575b600080fd5b61005c61004e565b005b34801561006957600080fd5b50610072610072565b6040518082815260200191505060405180910390f35b600081830190508050809050600060405180830381858888f193505050501580156100b2575060008281548110156100a957fe5b906000526020600020900160005b5081905550806001546000908190555060008090505b9056fea26469706673582212202dbd6f1e6fb09aa6b88077a0e04fa73d9023d1b03c2ef0562a5fa5d7ed3ab5c364736f6c63430006040033";

  const deployContract = async () => {
    console.log(web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Create contract instance
    const MyContract = new web3.eth.Contract(MyContractABI);
    const deployTx = MyContract.deploy({
      data: MyContractBytecode,
      arguments: [
        /* constructor arguments */
      ],
    });

    // Estimate gas and deploy contract
    const gasEstimate = await deployTx.estimateGas({ from: account });
    const deployReceipt = await deployTx.send({
      from: account,
      gas: gasEstimate,
    });

    setContractAddress(deployReceipt.contractAddress);
  };

  // async function deployContract() {
  //   if (!isWeb3Enabled) {
  //     alert("Please connect to MetaMask to deploy the contract.");
  //     return;
  //   }

  //   // const accounts = await web3.eth.getAccounts();
  //   // const account = accounts[0];

  //   // var currentProvider = new Web3.providers.HttpProvider(
  //   //   "http://localhost:3000"
  //   // );
  //   let contract;
  //   if (web3) {
  //     let x = new Web3(currentProvider).eth;
  //     console.log(x);
  //     contract = new x.Contract(MyContractABI);
  //   } else {
  //     console.error("web3 instance not found");
  //     return;
  //   }
  //   // const contract = new web3.eth.Contract(MyContractABI);
  //   const deployTx = contract.deploy({
  //     data: MyContractBytecode,
  //     arguments: [
  //       /* constructor arguments here */
  //     ],
  //   });
  //   // contract.setProvider(web3.currentProvider);
  //   // web3.currentProvider = currentProvider;
  //   let gasEstimate;
  //   if (web3.currentProvider) {
  //     gasEstimate = await deployTx.estimateGas({ from: account });
  //   } else {
  //     console.error("web3 provider not set");
  //     return;
  //   }

  //   const gasPrice = await web3.eth.getGasPrice();

  //   const deployOptions = {
  //     data: deployTx.encodeABI(),
  //     gas: gasEstimate,
  //     gasPrice,
  //     from: account,
  //   };

  //   const txHash = await web3.eth.sendTransaction(deployOptions);
  //   console.log(`Transaction hash: ${txHash}`);
  // }

  return (
    <>
      <Walletconnect />
      <div>check</div>
      <button onClick={isWeb3Enabled && deployContract}>Deploy Contract</button>
    </>
  );
}
