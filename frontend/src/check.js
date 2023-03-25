var Web3 = require("web3");

var bytecode = require("../constants/bytecode.json");
var abi = require("../constants/abi.json");
const providers = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(providers);

async function check() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
}
check();
// console.log(bytecode.simpleNft);
const MyContract = new web3.eth.Contract(abi.simpleNft);

// Deploy contract
MyContract.deploy({
  data: bytecode.simpleNft,
})
  .send({
    from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    gas: 3000000,
    gasPrice: "10000000000",
  })
  .then((newContractInstance) => {
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
  });
